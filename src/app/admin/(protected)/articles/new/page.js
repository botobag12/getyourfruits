import Link from "next/link";
import { createClient } from "../../../../../lib/supabase/server";
import ArticleForm from "../../../../../components/admin/ArticleForm";

export default async function NewArticlePage() {
  const supabase = await createClient();

  const { data: categories, error } = await supabase
    .from("categories")
    .select("id, name")
    .order("name");

  if (error) {
    return (
      <div className="admin-content">
        <div className="admin-error-box">
          Unable to load categories.
          <br />
          {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-content">

      <div className="admin-page-header">

        <div>
          <h1>Add New Article</h1>
          <p>Create a new GetYourFruits article.</p>
        </div>

        <Link
          href="/admin/articles"
          className="admin-secondary-button"
        >
          ← Back to Articles
        </Link>

      </div>

      <ArticleForm categories={categories || []} />

    </div>
  );
}