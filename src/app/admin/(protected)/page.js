import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import StatCard from "@/components/admin/StatCard";

export default function AdminDashboard() {
  return (
    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-main">

        <AdminHeader />

        <section className="admin-content">

          <div className="admin-page-title">
            <div>
              <h1>Dashboard</h1>
              <p>Welcome back to GetYourFruits Admin.</p>
            </div>

            <a href="/admin/articles/new" className="admin-primary-button">
              + Add Article
            </a>
          </div>

          {/* Statistics */}

          <div className="stats-grid">

            <StatCard
              title="Total Articles"
              value="24"
              icon="📝"
            />

            <StatCard
              title="Published"
              value="18"
              icon="🌿"
            />

            <StatCard
              title="Drafts"
              value="6"
              icon="📄"
            />

            <StatCard
              title="Categories"
              value="8"
              icon="📚"
            />

          </div>

          {/* Recent Articles */}

          <section className="admin-section">

            <div className="section-heading">
              <div>
                <h2>Recent Articles</h2>
                <p>Your latest articles and drafts.</p>
              </div>

              <a href="/admin/articles" className="view-all">
                View All
              </a>
            </div>

            <div className="articles-table">

              <div className="table-header">
                <span>Article</span>
                <span>Category</span>
                <span>Status</span>
                <span>Date</span>
                <span>Action</span>
              </div>

              <div className="table-row">
                <span>
                  <strong>10 Health Benefits of Almonds</strong>
                </span>

                <span>Almonds</span>

                <span className="status published">
                  Published
                </span>

                <span>Oct 2, 2026</span>

                <a href="/admin/articles/1/edit">
                  Edit
                </a>
              </div>

              <div className="table-row">
                <span>
                  <strong>Best Dry Fruits for Brain Health</strong>
                </span>

                <span>Health</span>

                <span className="status published">
                  Published
                </span>

                <span>Oct 1, 2026</span>

                <a href="/admin/articles/2/edit">
                  Edit
                </a>
              </div>

              <div className="table-row">
                <span>
                  <strong>How to Store Walnuts Properly</strong>
                </span>

                <span>Storage</span>

                <span className="status draft">
                  Draft
                </span>

                <span>Sep 30, 2026</span>

                <a href="/admin/articles/3/edit">
                  Edit
                </a>
              </div>

            </div>

          </section>

        </section>

      </main>

    </div>
  );
}