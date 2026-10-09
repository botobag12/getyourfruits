export default function AdminHeader() {
  return (
    <header className="admin-header">

      <div>
        <span className="admin-breadcrumb">
          Admin / Dashboard
        </span>
      </div>

      <div className="admin-user">

        <div className="admin-user-avatar">
          A
        </div>

        <div>
          <strong>Administrator</strong>
          <span>Admin</span>
        </div>

      </div>

    </header>
  );
}