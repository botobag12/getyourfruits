"use client";

import {
  useRef,
  useState,
} from "react";

import {
  useEditor,
  EditorContent,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

import { Link } from "@tiptap/extension-link";

import { Image } from "@tiptap/extension-image";

import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";

import { supabase } from "../../lib/supabase/client";

export default function ArticleEditor({
  onContentChange,
}) {
  const imageInputRef = useRef(null);

  const [
    uploadingImage,
    setUploadingImage,
  ] = useState(false);

  const [
    imageError,
    setImageError,
  ] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,

      Link.configure({
        openOnClick: false,
      }),

      Image.configure({
        inline: false,
        allowBase64: false,
      }),

      Table.configure({
        resizable: true,
      }),

      TableRow,
      TableHeader,
      TableCell,
    ],

    content: "",

    onUpdate: ({ editor }) => {
      if (onContentChange) {
        onContentChange(
          editor.getJSON()
        );
      }
    },

    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  const openImagePicker = () => {
    imageInputRef.current?.click();
  };

  const handleImageUpload = async (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    setImageError("");

    if (!file.type.startsWith("image/")) {
      setImageError(
        "Please select a valid image file."
      );

      event.target.value = "";
      return;
    }

    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
      setImageError(
        "Image size must be less than 5 MB."
      );

      event.target.value = "";
      return;
    }

    setUploadingImage(true);

    try {
      const {
        data: { user },
        error: userError,
      } =
        await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error(
          "Your admin session has expired. Please log in again."
        );
      }

      const extension =
        file.name
          .split(".")
          .pop()
          ?.toLowerCase() || "jpg";

      const safeFileName =
        file.name
          .replace(
            /\.[^/.]+$/,
            ""
          )
          .toLowerCase()
          .replace(
            /[^a-z0-9]+/g,
            "-"
          )
          .replace(
            /^-+|-+$/g,
            ""
          ) || "article-image";

      const filePath =
        `content/${user.id}/${Date.now()}-${safeFileName}.${extension}`;

      const {
        error: uploadError,
      } =
        await supabase.storage
          .from("article-image")
          .upload(
            filePath,
            file,
            {
              cacheControl: "3600",
              upsert: false,
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

      editor
        .chain()
        .focus()
        .setImage({
          src: data.publicUrl,
          alt: file.name,
        })
        .run();

    } catch (error) {
      setImageError(
        error.message ||
          "Unable to upload image."
      );
    } finally {
      setUploadingImage(false);

      event.target.value = "";
    }
  };

  return (
    <div className="article-editor">

      {/* Hidden image input */}

      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{
          display: "none",
        }}
      />

      {/* Toolbar */}

      <div className="editor-toolbar">

        {/* Bold */}

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={
            editor.isActive("bold")
              ? "active"
              : ""
          }
        >
          B
        </button>

        {/* Italic */}

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={
            editor.isActive("italic")
              ? "active"
              : ""
          }
        >
          I
        </button>

        {/* H1 */}

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({
                level: 1,
              })
              .run()
          }
          className={
            editor.isActive(
              "heading",
              { level: 1 }
            )
              ? "active"
              : ""
          }
        >
          H1
        </button>

        {/* H2 */}

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({
                level: 2,
              })
              .run()
          }
          className={
            editor.isActive(
              "heading",
              { level: 2 }
            )
              ? "active"
              : ""
          }
        >
          H2
        </button>

        {/* H3 */}

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({
                level: 3,
              })
              .run()
          }
          className={
            editor.isActive(
              "heading",
              { level: 3 }
            )
              ? "active"
              : ""
          }
        >
          H3
        </button>

        {/* Bullet List */}

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBulletList()
              .run()
          }
          className={
            editor.isActive(
              "bulletList"
            )
              ? "active"
              : ""
          }
        >
          • List
        </button>

        {/* Numbered List */}

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleOrderedList()
              .run()
          }
          className={
            editor.isActive(
              "orderedList"
            )
              ? "active"
              : ""
          }
        >
          1. List
        </button>

        {/* Quote */}

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBlockquote()
              .run()
          }
          className={
            editor.isActive(
              "blockquote"
            )
              ? "active"
              : ""
          }
        >
          Quote
        </button>

        {/* Link */}

        <button
          type="button"
          onClick={() => {
            const url =
              window.prompt(
                "Enter URL"
              );

            if (url) {
              editor
                .chain()
                .focus()
                .setLink({
                  href: url,
                })
                .run();
            }
          }}
          className={
            editor.isActive("link")
              ? "active"
              : ""
          }
        >
          Link
        </button>

        {/* Image */}

        <button
          type="button"
          onClick={openImagePicker}
          disabled={uploadingImage}
        >
          {uploadingImage
            ? "Uploading..."
            : "Image"}
        </button>

        {/* Table */}

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({
                rows: 3,
                cols: 3,
                withHeaderRow:
                  true,
              })
              .run()
          }
        >
          Table
        </button>

      </div>

      {/* Image Error */}

      {imageError && (
        <div className="editor-image-error">
          {imageError}
        </div>
      )}

      {/* Editor */}

      <EditorContent
        editor={editor}
      />

    </div>
  );
}