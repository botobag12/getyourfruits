import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">

      <div className="admin-logo">

        <img
          src="/logo.png"
          alt="GetYourFruits"
        />

        <div>
          <strong>GetYourFruits</strong>
          <span>Admin Panel</span>
        </div>

      </div>

      <nav className="admin-nav">

        <p className="nav-label">
          MAIN
        </p>

        <Link
          href="/admin"
          className="admin-nav-link active"
        >
          <span>📊</span>
          Dashboard
        </Link>

        <Link
          href="/admin/articles"
          className="admin-nav-link"
        >
          <span>📝</span>
          Articles
        </Link>

        <Link
          href="/admin/articles/new"
          className="admin-nav-link"
        >
          <span>➕</span>
          Add Article
        </Link>

        <p className="nav-label">
          CONTENT
        </p>

        <Link
          href="/admin/categories"
          className="admin-nav-link"
        >
          <span>📚</span>
          Categories
        </Link>

        <Link
          href="/admin/media"
          className="admin-nav-link"
        >
          <span>🖼️</span>
          Media
        </Link>

        <p className="nav-label">
          SYSTEM
        </p>

        <Link
          href="/admin/settings"
          className="admin-nav-link"
        >
          <span>⚙️</span>
          Settings
        </Link>

      </nav>

      <div className="admin-sidebar-bottom">

        <Link href="/">
          🌐 View Website
        </Link>

        <button>
          🚪 Logout
        </button>

      </div>

    </aside>
  );
}