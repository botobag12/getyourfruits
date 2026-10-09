export default function StatCard({ title, value, icon }) {
  return (
    <div className="stat-card">

      <div className="stat-card-top">

        <div className="stat-icon">
          {icon}
        </div>

        <span className="stat-arrow">
          ↗
        </span>

      </div>

      <div className="stat-value">
        {value}
      </div>

      <div className="stat-title">
        {title}
      </div>

    </div>
  );
}