import Link from "next/link";
import { createClient } from "../../../../lib/supabase/server";

export default async function ArticlesPage() {
  const supabase = await createClient();

  const { data: articles, error } = await supabase
    .from("articles")
    .select(`
      id,
      title,
      slug,
      status,
      author,
      created_at,
      published_at,
      categories (
        name
      )
    `)
    .order("created_at", { ascending: false });

  return (
    <div className="admin-content">

      <div className="admin-page-header">

        <div>
          <h1>Articles</h1>
          <p>Manage your GetYourFruits articles.</p>
        </div>

        <Link
          href="/admin/articles/new"
          className="admin-primary-button"
        >
          + Add Article
        </Link>

      </div>

      {error ? (
        <div className="admin-error-box">
          Unable to load articles.
          <br />
          {error.message}
        </div>
      ) : articles && articles.length > 0 ? (

        <div className="admin-table-container">

          <table className="admin-table">

            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Author</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {articles.map((article) => (

                <tr key={article.id}>

                  <td>
                    <strong>{article.title}</strong>
                  </td>

                  <td>
                    {article.categories?.name || "Uncategorized"}
                  </td>

                  <td>
                    <span
                      className={`article-status ${article.status}`}
                    >
                      {article.status}
                    </span>
                  </td>

                  <td>
                    {article.author || "Admin"}
                  </td>

                  <td>
                    {new Date(article.created_at).toLocaleDateString()}
                  </td>

                  <td>
                    <div className="article-actions">

                      <Link
                        href={`/admin/articles/${article.id}/edit`}
                        className="admin-action-button"
                      >
                        Edit
                      </Link>

                    </div>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      ) : (

        <div className="admin-empty-state">

          <h2>No articles yet</h2>

          <p>
            Start building your GetYourFruits content by creating
            your first article.
          </p>

          <Link
            href="/admin/articles/new"
            className="admin-primary-button"
          >
            Create Your First Article
          </Link>

        </div>

      )}

    </div>
  );
}