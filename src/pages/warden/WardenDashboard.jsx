import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./WardenDashboard.css";

function WardenDashboard() {
  const navigate = useNavigate();
  

  const [dashboardData, setDashboardData] = useState({
    total_students: 0,
    total_rooms: 0,
    total_beds: 0,
    occupied_beds: 0,
    available_beds: 0,
     confirmed_students: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/auth/warden/dashboard/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load dashboard data.");
        }

        return response.json();
      })
      .then((data) => {
        setDashboardData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Dashboard error:", error);
        setError("Unable to load dashboard data.");
        setLoading(false);
      });
  }, []);

  const totalActiveBeds =
    dashboardData.occupied_beds + dashboardData.available_beds;

  const occupancyPercentage =
    totalActiveBeds > 0
      ? Math.round(
          (dashboardData.occupied_beds / totalActiveBeds) * 100
        )
      : 0;

  const stats = [
    {
      title: "Total Students",
      value: dashboardData.total_students,
      note: "Students in hostel",
      icon: "👥",
    },
    {
      title: "Total Rooms",
      value: dashboardData.total_rooms,
      note: "Active hostel rooms",
      icon: "⌂",
    },
    {
      title: "Occupied Beds",
      value: dashboardData.occupied_beds,
      note: "Currently occupied",
      icon: "🛏",
    },
    {
      title: "Available Beds",
      value: dashboardData.available_beds,
      note: "Ready for allocation",
      icon: "🛏",
    },
  ];

  
  const handleLogout = () => {
    localStorage.removeItem("shmsUser");
    navigate("/");
  };

  return (
    <div className="warden-layout">

      {/* SIDEBAR */}
      <aside className="warden-sidebar">

        <div className="warden-brand">
          <div className="warden-brand-logo">
            SH
          </div>

          <div className="warden-brand-text">
            <h2>SHMS</h2>
            <span>Hostel Management</span>
          </div>
        </div>

        <nav className="warden-nav">

          <Link
            to="/warden/dashboard"
            className="warden-nav-item active"
          >
            <span className="nav-icon">▦</span>
            Dashboard
          </Link>

          <Link
            to="/warden/students"
            className="warden-nav-item"
          >
            <span className="nav-icon">👥</span>
            Students
          </Link>

          <Link
            to="/warden/rooms"
            className="warden-nav-item"
          >
            <span className="nav-icon">🛏</span>
            Rooms & Beds
          </Link>

          <Link
            to="/warden/payments"
            className="warden-nav-item"
          >
            <span className="nav-icon">▤</span>
            Payments
          </Link>

          <Link
            to="/warden/checkin"
            className="warden-nav-item"
          >
            <span className="nav-icon">↔</span>
            Check-in / Check-out
          </Link>

          <Link
            to="/warden/complaints"
            className="warden-nav-item"
          >
            <span className="nav-icon">⚠</span>
            Complaints
          </Link>

          <Link
            to="/warden/transfers"
            className="warden-nav-item"
          >
            <span className="nav-icon">⇄</span>
            Transfers
          </Link>

          <Link
            to="/warden/notifications"
            className="warden-nav-item"
          >
            <span className="nav-icon">♧</span>
            Notifications
          </Link>

        </nav>

        <div className="warden-sidebar-bottom">

          <Link
            to="/warden/settings"
            className="warden-nav-item"
          >
            <span className="nav-icon">⚙</span>
            Settings
          </Link>

          <button
            type="button"
            className="warden-nav-item logout-item"
            onClick={handleLogout}
          >
            <span className="nav-icon">↪</span>
            Logout
          </button>

        </div>

      </aside>

      {/* MAIN */}
      <main className="warden-main">

        {/* TOP BAR */}
        <header className="warden-topbar">

          <div className="warden-page-heading">
            <span className="warden-small-label">
              WARDEN PANEL
            </span>

            <h1>Warden Dashboard</h1>

            <p>
              Manage hostel residents and daily hostel activities.
            </p>
          </div>

          <div className="warden-user-area">

            <button
              type="button"
              className="warden-notification"
              title="Notifications"
            >
              ♧
              <span className="notification-dot"></span>
            </button>

            <div className="warden-avatar">
              W
            </div>

            <div className="warden-user-info">
              <strong>Warden</strong>
              <span>Hostel Officer</span>
            </div>

            <span className="user-arrow">⌄</span>

          </div>

        </header>

        {loading && (
          <div className="dashboard-message">
            Loading dashboard data...
          </div>
        )}

        {error && (
          <div className="dashboard-error">
            {error}
          </div>
        )}

        {/* STAT CARDS */}
        <section className="warden-stats">

          {stats.map((stat) => (
            <div
              className="warden-stat-card"
              key={stat.title}
            >

              <div className="stat-icon">
                {stat.icon}
              </div>

              <div className="stat-content">

                <span className="stat-title">
                  {stat.title}
                </span>

                <strong>
                  {stat.value}
                </strong>

                <small>
                  {stat.note}
                </small>

              </div>

              <span className="stat-arrow">›</span>

            </div>
          ))}

        </section>

        {/* MIDDLE SECTION */}
        <section className="warden-overview-grid">

          {/* HOSTEL ACTIVITY */}
          <div className="warden-panel activity-panel">

            <div className="panel-header">

              <div>
                <span className="panel-label">
                  TODAY
                </span>

                <h2>
                  Hostel Activity
                </h2>
              </div>

              <span className="panel-date">
                30 Sep 2026
              </span>

            </div>

            <div className="activity-list">

              <div className="activity-row">

                <div className="activity-circle green">
                  ✓
                </div>

                <div className="activity-info">
                  <strong>
                    New confirmed students
                  </strong>

                  <span>
                    Students ready for check-in
                  </span>
                </div>

                <strong className="activity-number">
                  8
                </strong>

                <span className="activity-arrow">
                  ›
                </span>

              </div>

              <div className="activity-row">

                <div className="activity-circle blue">
                  ↓
                </div>

                <div className="activity-info">
                  <strong>
                    Today's check-ins
                  </strong>

                  <span>
                    Students expected today
                  </span>
                </div>

                <strong className="activity-number">
                  5
                </strong>

                <span className="activity-arrow">
                  ›
                </span>

              </div>

              <div className="activity-row">

                <div className="activity-circle purple">
                  ↑
                </div>

                <div className="activity-info">
                  <strong>
                    Today's check-outs
                  </strong>

                  <span>
                    Students expected to leave
                  </span>
                </div>

                <strong className="activity-number">
                  3
                </strong>

                <span className="activity-arrow">
                  ›
                </span>

              </div>

            </div>

          </div>

          {/* HOSTEL CAPACITY */}
          <div className="warden-panel capacity-panel">

            <div className="panel-header">

              <div>
                <span className="panel-label">
                  OCCUPANCY
                </span>

                <h2>
                  Hostel Capacity
                </h2>
              </div>

            </div>

            <div className="capacity-summary">
              <strong>
                {occupancyPercentage}%
              </strong>

              <span>
                Overall occupancy
              </span>
            </div>

            <div className="capacity-bar">
              <div
                className="capacity-fill"
                style={{
                  width: `${occupancyPercentage}%`,
                }}
              ></div>
            </div>

            <div className="capacity-breakdown">

              <div>
                <span>Occupied</span>
                <strong>
                  {dashboardData.occupied_beds}
                </strong>
              </div>

              <div>
                <span>Total Beds</span>
                <strong>
                  {dashboardData.total_beds}
                </strong>
              </div>

              <div>
                <span>Available</span>
                <strong>
                  {dashboardData.available_beds}
                </strong>
              </div>

            </div>

          </div>

        </section>

        {/* CONFIRMED STUDENTS */}
        <section className="warden-panel confirmed-panel">

          <div className="panel-header confirmed-header">

            <div>

              <span className="panel-label">
                RECENT
              </span>

              <h2>
                New Confirmed Students
              </h2>

              <p>
                Students whose payment and room allocation
                have been confirmed.
              </p>

            </div>

            <button
              type="button"
              className="view-all-button"
            >
              View All
              <span>›</span>
            </button>

          </div>

          <div className="table-wrapper">

            <table className="warden-table">

              <thead>
                <tr>
                  <th>Student</th>
                  <th>Room</th>
                  <th>Bed</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Rental Period</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>

                {dashboardData.confirmed_students.map((student) => (
                  <tr key={`${student.name}-${student.room}-${student.bed}`}>

                    <td>
                      <div className="student-cell">

                        <div className="student-avatar">
                          {student.name.charAt(0).toUpperCase()}
                        </div>

                        <div className="student-info">
                          <strong>
                            {student.name}
                          </strong>

                          <span>
                            Hostel resident
                          </span>
                        </div>

                      </div>
                    </td>

                    <td>
                      Room {student.room}
                    </td>

                    <td>
                      Bed {student.bed}
                    </td>

                    <td>
                      <span className="status-badge verified">
                        ✓ {student.payment}
                      </span>
                    </td>

                    <td>
                      <span className="status-badge ready">
                        {student.status}
                      </span>
                    </td>

                    <td>
                      {student.rental}
                    </td>

                    <td className="row-arrow">
                      ›
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </section>

      </main>

    </div>
  );
}

export default WardenDashboard;