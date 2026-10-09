"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ArticleEditor from "./ArticleEditor";
import ImageCropper from "./ImageCropper";

import { supabase } from "../../lib/supabase/client";

function createSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function ArticleForm({
  categories,
}) {
  const router = useRouter();

  const [title, setTitle] =
    useState("");

  const [slug, setSlug] =
    useState("");

  const [categoryId, setCategoryId] =
    useState("");

  const [tags, setTags] =
    useState("");

  const [seoTitle, setSeoTitle] =
    useState("");

  const [
    metaDescription,
    setMetaDescription,
  ] = useState("");

  const [status, setStatus] =
    useState("draft");

  const [content, setContent] =
    useState(null);

  // Featured image
  const [
    featuredImage,
    setFeaturedImage,
  ] = useState(null);

 const [imagePreview, setImagePreview] =
  useState("");

const [imageDimensions, setImageDimensions] =
  useState(null);
  // Cropper
  const [
    cropperImage,
    setCropperImage,
  ] = useState("");

  const [
    uploadingImage,
    setUploadingImage,
  ] = useState(false);

  const [
    uploadedImagePath,
    setUploadedImagePath,
  ] = useState("");

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  // ------------------------------------------
  // Title
  // ------------------------------------------

  const handleTitleChange = (
    value
  ) => {
    setTitle(value);

    if (
      !slug ||
      slug === createSlug(title)
    ) {
      setSlug(
        createSlug(value)
      );
    }
  };

  // ------------------------------------------
  // Select Featured Image
  // ------------------------------------------

  const handleImageChange = (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");

    if (!file.type.startsWith("image/")) {
      setError(
        "Please select a valid image file."
      );

      event.target.value = "";
      return;
    }

    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        "Image size must be less than 5 MB."
      );

      event.target.value = "";
      return;
    }

    const previewUrl =
      URL.createObjectURL(file);

    // Open cropper
    setCropperImage(
      previewUrl
    );

    // Clear input
    event.target.value = "";
  };

  // ------------------------------------------
  // Cropper Cancel
  // ------------------------------------------

  const handleCropCancel = () => {
    if (cropperImage) {
      URL.revokeObjectURL(
        cropperImage
      );
    }

    setCropperImage("");
  };

  // ------------------------------------------
  // Cropper Complete
  // ------------------------------------------

  const handleCropComplete = (
    croppedBlob
  ) => {
    if (cropperImage) {
      URL.revokeObjectURL(
        cropperImage
      );
    }

    const croppedFile =
      new File(
        [croppedBlob],
        `featured-image-${Date.now()}.jpg`,
        {
          type: "image/jpeg",
        }
      );

    const previewUrl =
      URL.createObjectURL(
        croppedFile
      );

    setFeaturedImage(
      croppedFile
    );

    setImagePreview(
      previewUrl
    );

    setCropperImage("");
  };

  // ------------------------------------------
  // Upload Featured Image
  // ------------------------------------------

  const uploadFeaturedImage =
    async (userId) => {
      if (!featuredImage) {
        return {
          publicUrl: null,
          path: null,
        };
      }

      setUploadingImage(true);

      try {
        const filePath =
          `featured/${userId}/${Date.now()}-featured-image.jpg`;

        const {
          error: uploadError,
        } =
          await supabase.storage
            .from("article-image")
            .upload(
              filePath,
              featuredImage,
              {
                cacheControl:
                  "3600",
                upsert: false,
                contentType:
                  "image/jpeg",
              }
            );

        if (uploadError) {
          throw new Error(
            `Image upload failed: ${uploadError.message}`
          );
        }

        const {
          data,
        } =
          supabase.storage
            .from("article-image")
            .getPublicUrl(
              filePath
            );

        if (!data?.publicUrl) {
          throw new Error(
            "Unable to generate the image URL."
          );
        }

        setUploadedImagePath(
          filePath
        );

        return {
          publicUrl:
            data.publicUrl,
          path: filePath,
        };
      } finally {
        setUploadingImage(
          false
        );
      }
    };

  // ------------------------------------------
  // Save Article
  // ------------------------------------------

  const saveArticle = async (
    articleStatus
  ) => {
    setError("");
    setSaving(true);

    let uploadedPath = null;

    try {
      if (!title.trim()) {
        throw new Error(
          "Please enter an article title."
        );
      }

      if (!slug.trim()) {
        throw new Error(
          "Please enter an article slug."
        );
      }

      if (!categoryId) {
        throw new Error(
          "Please select a category."
        );
      }

      if (!content) {
        throw new Error(
          "Please add some article content."
        );
      }

      // ------------------------------------------
      // Get Admin
      // ------------------------------------------

      const {
        data: {
          user,
        },
        error: userError,
      } =
        await supabase.auth.getUser();

      if (
        userError ||
        !user
      ) {
        throw new Error(
          "Your admin session has expired. Please log in again."
        );
      }

      // ------------------------------------------
      // Check Profile
      // ------------------------------------------

      const {
        data: profile,
        error: profileError,
      } =
        await supabase
          .from("profiles")
          .select(
            "full_name, role"
          )
          .eq(
            "id",
            user.id
          )
          .single();

      if (
        profileError ||
        !profile ||
        profile.role !==
          "admin"
      ) {
        throw new Error(
          "You do not have permission to create articles."
        );
      }

      // ------------------------------------------
      // Upload Featured Image
      // ------------------------------------------

      let imageUrl = null;

      if (featuredImage) {
        const uploadedImage =
          await uploadFeaturedImage(
            user.id
          );

        imageUrl =
          uploadedImage.publicUrl;

        uploadedPath =
          uploadedImage.path;
      }

      // ------------------------------------------
      // Article Object
      // ------------------------------------------

      const article = {
        title:
          title.trim(),

        slug:
          slug.trim(),

        content:
          JSON.stringify(
            content
          ),

        category_id:
          Number(
            categoryId
          ),

        tags:
          tags
            .split(",")
            .map(
              (tag) =>
                tag.trim()
            )
            .filter(
              Boolean
            ),

        author:
          profile.full_name ||
          "Administrator",

        status:
          articleStatus,

        featured_image:
          imageUrl,

        seo_title:
          seoTitle.trim() ||
          title.trim(),

        meta_description:
          metaDescription.trim(),

        published_at:
          articleStatus ===
          "published"
            ? new Date().toISOString()
            : null,
      };

      // ------------------------------------------
      // Insert
      // ------------------------------------------

      const {
        error:
          insertError,
      } =
        await supabase
          .from("articles")
          .insert(
            article
          );

      if (insertError) {

        // Remove image if article failed
        if (uploadedPath) {
          await supabase.storage
            .from(
              "article-image"
            )
            .remove([
              uploadedPath,
            ]);
        }

        if (
          insertError.code ===
          "23505"
        ) {
          throw new Error(
            "This slug already exists. Please choose a different slug."
          );
        }

        throw new Error(
          insertError.message
        );
      }

      // ------------------------------------------
      // Success
      // ------------------------------------------

      router.push(
        "/admin/articles"
      );

      router.refresh();

    } catch (err) {
      setError(
        err.message ||
          "Something went wrong."
      );

      setSaving(false);
    }
  };

  // ------------------------------------------
  // Submit
  // ------------------------------------------

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    await saveArticle(
      status
    );
  };

  // ------------------------------------------
  // Save Draft
  // ------------------------------------------

  const handleSaveDraft =
    async () => {
      await saveArticle(
        "draft"
      );
    };

  // ------------------------------------------
  // Render
  // ------------------------------------------

  return (
    <>
      {/* Image Cropper */}

      {cropperImage && (
        <ImageCropper
          image={
            cropperImage
          }
          onCancel={
            handleCropCancel
          }
          onComplete={
            handleCropComplete
          }
        />
      )}

      <form
        className="article-form"
        onSubmit={
          handleSubmit
        }
      >

        {/* Error */}

        {error && (
          <div className="admin-error-box article-form-error">
            {error}
          </div>
        )}

        {/* -------------------------------- */}
        {/* Article Information */}
        {/* -------------------------------- */}

        <section className="article-form-section">

          <h2>
            Article Information
          </h2>

          <div className="article-form-group">

            <label htmlFor="title">
              Article Title
            </label>

            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) =>
                handleTitleChange(
                  e.target.value
                )
              }
              placeholder="Enter your article title"
            />

          </div>

          <div className="article-form-group">

            <label htmlFor="slug">
              Slug
            </label>

            <input
              id="slug"
              type="text"
              value={slug}
              onChange={(e) =>
                setSlug(
                  createSlug(
                    e.target.value
                  )
                )
              }
              placeholder="example-dry-fruit-article"
            />

            <small>
              Your article URL will use this slug.
            </small>

          </div>

          <div className="article-form-group">

            <label htmlFor="category">
              Category
            </label>

            <select
              id="category"
              value={categoryId}
              onChange={(e) =>
                setCategoryId(
                  e.target.value
                )
              }
            >

              <option value="">
                Select a category
              </option>

              {categories?.map(
                (category) => (
                  <option
                    key={
                      category.id
                    }
                    value={
                      category.id
                    }
                  >
                    {
                      category.name
                    }
                  </option>
                )
              )}

            </select>

          </div>

        </section>

        {/* -------------------------------- */}
        {/* Featured Image */}
        {/* -------------------------------- */}

        <section className="article-form-section">

          <h2>
            Featured Image
          </h2>

          <div className="article-form-group">

            <label htmlFor="featured-image">
              Choose Featured Image
            </label>

            <input
              id="featured-image"
              type="file"
              accept="image/*"
              onChange={
                handleImageChange
              }
              disabled={
                saving ||
                uploadingImage
              }
            />

            <small>
              Maximum size: 5 MB.
              You can crop, zoom and
              rotate the image after
              selecting it.
            </small>

          </div>

          {/* Preview */}

          {imagePreview && (
            <div className="featured-image-preview">

              <p>
                Featured Image Preview
              </p>

              <img
                src={
                  imagePreview
                }
                alt="Featured image preview"
              />

              <button
                type="button"
                className="admin-secondary-button"
                onClick={() => {
                  if (
                    imagePreview
                  ) {
                    URL.revokeObjectURL(
                      imagePreview
                    );
                  }

                  setFeaturedImage(
                    null
                  );

                  setImagePreview(
                    ""
                  );
                }}
              >
                Remove Image
              </button>

            </div>
          )}

        </section>

        {/* -------------------------------- */}
        {/* Article Content */}
        {/* -------------------------------- */}

        <section className="article-form-section">

          <h2>
            Article Content
          </h2>

          <ArticleEditor
            onContentChange={(
              json
            ) =>
              setContent(
                json
              )
            }
          />

        </section>

        {/* -------------------------------- */}
        {/* Tags */}
        {/* -------------------------------- */}

        <section className="article-form-section">

          <h2>
            Tags
          </h2>

          <div className="article-form-group">

            <label htmlFor="tags">
              Article Tags
            </label>

            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) =>
                setTags(
                  e.target.value
                )
              }
              placeholder="almonds, nutrition, health, dry fruits"
            />

            <small>
              Separate tags with commas.
            </small>

          </div>

        </section>

        {/* -------------------------------- */}
        {/* SEO */}
        {/* -------------------------------- */}

        <section className="article-form-section">

          <h2>
            SEO Settings
          </h2>

          <div className="article-form-group">

            <label htmlFor="seo_title">
              SEO Title
            </label>

            <input
              id="seo_title"
              type="text"
              value={seoTitle}
              onChange={(e) =>
                setSeoTitle(
                  e.target.value
                )
              }
              placeholder="Benefits of Almonds: Nutrition and Health Guide"
            />

          </div>

          <div className="article-form-group">

            <label htmlFor="meta_description">
              Meta Description
            </label>

            <textarea
              id="meta_description"
              rows="4"
              value={
                metaDescription
              }
              onChange={(e) =>
                setMetaDescription(
                  e.target.value
                )
              }
              placeholder="Write a short description for search engines..."
            />

          </div>

        </section>

        {/* -------------------------------- */}
        {/* Publishing */}
        {/* -------------------------------- */}

        <section className="article-form-section">

          <h2>
            Publishing
          </h2>

          <div className="article-form-group">

            <label htmlFor="status">
              Status
            </label>

            <select
              id="status"
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
            >

              <option value="draft">
                Draft
              </option>

              <option value="published">
                Published
              </option>

            </select>

          </div>

        </section>

        {/* -------------------------------- */}
        {/* Actions */}
        {/* -------------------------------- */}

        <div className="article-form-actions">

          <button
            type="button"
            className="admin-secondary-button"
            onClick={
              handleSaveDraft
            }
            disabled={
              saving ||
              uploadingImage
            }
          >
            {uploadingImage
              ? "Uploading Image..."
              : saving
              ? "Saving..."
              : "Save Draft"}
          </button>

          <button
            type="submit"
            className="admin-primary-button"
            disabled={
              saving ||
              uploadingImage
            }
          >
            {uploadingImage
              ? "Uploading Image..."
              : saving
              ? "Publishing..."
              : "Publish Article"}
          </button>

        </div>

      </form>
    </>
  );
}