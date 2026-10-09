"use client";

import { useCallback, useState } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";


// --------------------------------------------------
// Load image
// --------------------------------------------------

function createImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = reject;

    image.src = url;
  });
}


// --------------------------------------------------
// Create the actual cropped image
// --------------------------------------------------

async function getCroppedImage(
  imageSrc,
  crop,
  zoom,
  rotation
) {
  const image = await createImage(imageSrc);

  // ----------------------------------------------
  // Calculate the relationship between displayed
  // image and original image
  // ----------------------------------------------

  const scaleX =
    image.naturalWidth / image.width;

  const scaleY =
    image.naturalHeight / image.height;


  // ----------------------------------------------
  // Convert crop coordinates to original image
  // coordinates
  // ----------------------------------------------

  let cropX =
    crop.x * scaleX;

  let cropY =
    crop.y * scaleY;

  let cropWidth =
    crop.width * scaleX;

  let cropHeight =
    crop.height * scaleY;


  // ----------------------------------------------
  // Apply zoom to the SOURCE area.
  //
  // zoom 1   = normal
  // zoom 2   = zoom in
  // zoom 3   = strong zoom in
  // zoom 0.5 = zoom out
  // ----------------------------------------------

  const cropCenterX =
    cropX + cropWidth / 2;

  const cropCenterY =
    cropY + cropHeight / 2;

  const zoomedWidth =
    cropWidth / zoom;

  const zoomedHeight =
    cropHeight / zoom;


  cropX =
    cropCenterX -
    zoomedWidth / 2;

  cropY =
    cropCenterY -
    zoomedHeight / 2;

  cropWidth =
    zoomedWidth;

  cropHeight =
    zoomedHeight;


  // ----------------------------------------------
  // Keep crop inside original image
  // ----------------------------------------------

  cropX = Math.max(
    0,
    Math.min(
      cropX,
      image.naturalWidth - cropWidth
    )
  );

  cropY = Math.max(
    0,
    Math.min(
      cropY,
      image.naturalHeight - cropHeight
    )
  );

  cropWidth = Math.min(
    cropWidth,
    image.naturalWidth
  );

  cropHeight = Math.min(
    cropHeight,
    image.naturalHeight
  );


  // ----------------------------------------------
  // Create temporary canvas for cropped area
  // ----------------------------------------------

  const croppedCanvas =
    document.createElement("canvas");

  croppedCanvas.width =
    Math.round(cropWidth);

  croppedCanvas.height =
    Math.round(cropHeight);

  const croppedContext =
    croppedCanvas.getContext("2d");


  if (!croppedContext) {
    throw new Error(
      "Could not create canvas context."
    );
  }


  // Draw white background.
  // This prevents black corners after rotation.
  croppedContext.fillStyle = "#ffffff";

  croppedContext.fillRect(
    0,
    0,
    croppedCanvas.width,
    croppedCanvas.height
  );


  // Draw the selected area
  croppedContext.drawImage(
    image,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    0,
    0,
    croppedCanvas.width,
    croppedCanvas.height
  );


  // ----------------------------------------------
  // If there is no rotation, return directly
  // ----------------------------------------------

  if (rotation === 0) {
    return new Promise(
      (resolve, reject) => {
        croppedCanvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(
                new Error(
                  "Could not create cropped image."
                )
              );

              return;
            }

            resolve(blob);
          },
          "image/jpeg",
          0.92
        );
      }
    );
  }


  // ----------------------------------------------
  // Rotate cropped image
  // ----------------------------------------------

  const radians =
    (rotation * Math.PI) / 180;

  const sin =
    Math.abs(Math.sin(radians));

  const cos =
    Math.abs(Math.cos(radians));


  const rotatedWidth =
    Math.round(
      croppedCanvas.width * cos +
      croppedCanvas.height * sin
    );

  const rotatedHeight =
    Math.round(
      croppedCanvas.width * sin +
      croppedCanvas.height * cos
    );


  const rotatedCanvas =
    document.createElement("canvas");

  rotatedCanvas.width =
    rotatedWidth;

  rotatedCanvas.height =
    rotatedHeight;

  const rotatedContext =
    rotatedCanvas.getContext("2d");


  if (!rotatedContext) {
    throw new Error(
      "Could not create rotation canvas."
    );
  }


  // White background
  rotatedContext.fillStyle =
    "#ffffff";

  rotatedContext.fillRect(
    0,
    0,
    rotatedWidth,
    rotatedHeight
  );


  // Move to center
  rotatedContext.translate(
    rotatedWidth / 2,
    rotatedHeight / 2
  );

  // Rotate
  rotatedContext.rotate(
    radians
  );


  // Draw cropped image
  rotatedContext.drawImage(
    croppedCanvas,
    -croppedCanvas.width / 2,
    -croppedCanvas.height / 2
  );


  rotatedContext.setTransform(
    1,
    0,
    0,
    1,
    0,
    0
  );


  // ----------------------------------------------
  // Convert final canvas to JPEG
  // ----------------------------------------------

  return new Promise(
    (resolve, reject) => {
      rotatedCanvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(
              new Error(
                "Could not create rotated image."
              )
            );

            return;
          }

          resolve(blob);
        },
        "image/jpeg",
        0.92
      );
    }
  );
}


// --------------------------------------------------
// Image Cropper
// --------------------------------------------------

export default function ImageCropper({
  image,
  onCancel,
  onComplete,
}) {
  const [crop, setCrop] =
    useState(null);

  const [zoom, setZoom] =
    useState(1);

  const [rotation, setRotation] =
    useState(0);

  const [imageElement, setImageElement] =
    useState(null);

  const [processing, setProcessing] =
    useState(false);


  // ----------------------------------------------
  // Image loaded
  // ----------------------------------------------

  const onImageLoad =
    useCallback(
      (event) => {
        const loadedImage =
          event.currentTarget;

        setImageElement(
          loadedImage
        );


        const width =
          loadedImage.width;

        const height =
          loadedImage.height;


        // Start with a large crop area.
        // It is NOT locked to 16:9.
        const initialCrop =
          centerCrop(
            makeAspectCrop(
              {
                unit: "px",
                width:
                  width * 0.7,
              },
              16 / 9,
              width,
              height
            ),
            width,
            height
          );


        setCrop(
          initialCrop
        );
      },
      []
    );


  // ----------------------------------------------
  // Zoom
  // ----------------------------------------------

  const handleZoomChange =
    (event) => {
      const value =
        Number(
          event.target.value
        );

      setZoom(value);
    };


  // ----------------------------------------------
  // Rotation
  // ----------------------------------------------

  const handleRotationChange =
    (event) => {
      const value =
        Number(
          event.target.value
        );

      setRotation(value);
    };


  // ----------------------------------------------
  // Apply crop
  // ----------------------------------------------

  const handleApply =
    async () => {
      if (
        !crop ||
        !imageElement
      ) {
        return;
      }


      setProcessing(true);


      try {
        const croppedBlob =
          await getCroppedImage(
            image,
            crop,
            zoom,
            rotation
          );


        // Send the REAL cropped image
        // back to ArticleForm
        onComplete(
          croppedBlob
        );

      } catch (error) {
        console.error(
          "Image processing error:",
          error
        );

        alert(
          "Unable to process the image."
        );

      } finally {
        setProcessing(false);
      }
    };


  // ----------------------------------------------
  // Render
  // ----------------------------------------------

  return (
    <div className="image-cropper-overlay">

      <div className="image-cropper-modal">

        {/* -------------------------------------- */}
        {/* Header */}
        {/* -------------------------------------- */}

        <div className="image-cropper-header">

          <div>
            <h3>
              Edit Image
            </h3>

            <p>
              Resize the crop box,
              zoom and rotate your image.
            </p>
          </div>


          <button
            type="button"
            className="image-cropper-close"
            onClick={onCancel}
            disabled={processing}
          >
            ×
          </button>

        </div>


        {/* -------------------------------------- */}
        {/* Crop Area */}
        {/* -------------------------------------- */}

        <div className="image-cropper-area">

          <div className="image-crop-wrapper">

            <ReactCrop
              crop={crop}
              onChange={(newCrop) => {
                setCrop(newCrop);
              }}
              aspect={undefined}
              keepSelection={true}
              minWidth={80}
              minHeight={80}
            >

              <img
                src={image}
                alt="Crop preview"
                onLoad={
                  onImageLoad
                }
                style={{
                  display: "block",
                  maxWidth: "100%",
                  maxHeight: "60vh",
                  objectFit: "contain",
                }}
              />

            </ReactCrop>

          </div>

        </div>


        {/* -------------------------------------- */}
        {/* Controls */}
        {/* -------------------------------------- */}

        <div className="image-cropper-controls">


          {/* ------------------------------------ */}
          {/* Zoom */}
          {/* ------------------------------------ */}

          <div className="crop-control">

            <div className="crop-control-label">

              <span>
                Zoom
              </span>

              <span>
                {zoom.toFixed(1)}x
              </span>

            </div>


            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={zoom}
              onChange={
                handleZoomChange
              }
            />


            <div className="zoom-range-labels">

              <span>
                0.5×
              </span>

              <span>
                1×
              </span>

              <span>
                2×
              </span>

              <span>
                3×
              </span>

            </div>

          </div>


          {/* ------------------------------------ */}
          {/* Rotation */}
          {/* ------------------------------------ */}

          <div className="crop-control">

            <div className="crop-control-label">

              <span>
                Rotation
              </span>

              <span>
                {rotation}°
              </span>

            </div>


            <input
              type="range"
              min="-180"
              max="180"
              step="1"
              value={rotation}
              onChange={
                handleRotationChange
              }
            />


            <div className="zoom-range-labels">

              <span>
                -180°
              </span>

              <span>
                0°
              </span>

              <span>
                180°
              </span>

            </div>

          </div>

        </div>


        {/* -------------------------------------- */}
        {/* Actions */}
        {/* -------------------------------------- */}

        <div className="image-cropper-actions">

          <button
            type="button"
            className="admin-secondary-button"
            onClick={onCancel}
            disabled={processing}
          >
            Cancel
          </button>


          <button
            type="button"
            className="admin-primary-button"
            onClick={handleApply}
            disabled={
              processing ||
              !crop
            }
          >
            {processing
              ? "Processing..."
              : "Apply Changes"}
          </button>

        </div>

      </div>

    </div>
  );
}