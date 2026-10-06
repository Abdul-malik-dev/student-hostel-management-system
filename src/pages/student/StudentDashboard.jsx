import { useEffect, useState } from "react";
import "./StudentDashboard.css";
import { useLocation, Link, useNavigate } from "react-router-dom";

function StudentDashboard() {
 const [student, setStudent] = useState({
  fullName: "",
  username: "",
  phone: "",
  email: "",
  role: "STUDENT",
  applicationStatus: "Not Applied",
  room: null,
  paymentStatus: "Not Available",
});

  const navigate = useNavigate();

  useEffect(() => {
  const savedUser = localStorage.getItem("shmsUser");

  if (!savedUser) {
    return;
  }

  try {
    const user = JSON.parse(savedUser);

    fetch(
      `http://127.0.0.1:8000/api/auth/student/profile/?username=${encodeURIComponent(
        user.username
      )}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load student profile.");
        }

        return response.json();
      })
      .then((data) => {
        setStudent((currentStudent) => ({
          ...currentStudent,

          fullName: data.full_name,
          username: data.username,
          phone: data.phone,
          email: data.email,
          role: data.role,
        }));
      })
      .catch((error) => {
        console.error("Profile error:", error);
      });

  } catch (error) {
    console.error("Invalid saved user:", error);
  }
}, []);

  const handleLogout = () => {
  localStorage.removeItem("shmsUser");
  navigate("/");
};
  const statusColor = {
  Pending: "badge-blue",
  Approved: "badge-green",
  Rejected: "badge-red",
  "Not Applied": "badge-gray",
  "Not Paid": "badge-red",
  "Not Available": "badge-gray",
  "Pending Verification": "badge-blue",
  Verified: "badge-green",
};
  const location = useLocation();
  const [showLoginSuccess, setShowLoginSuccess] = useState(
          location.state?.loginSuccess || false
        );

        useEffect(() => {
          if (location.state?.loginSuccess) {
            const timer = setTimeout(() => {
              setShowLoginSuccess(false);
            }, 2000);

            return () => clearTimeout(timer);
          }
        }, [location.state]);

  return (
    <div className="dashboard">

      {/* ================= HEADER ================= */}
      <header className="dashboard-header">

      {showLoginSuccess && (
        <div className="login-success-toast">
          <div className="login-success-icon">✓</div>

          <div>
            <strong>Login Successful!</strong>
            <p>Welcome back to SHMS.</p>
          </div>
        </div>
      )}
        <div className="logo">
          <h1>SHMS</h1>
          <span>Student Hostel Management System</span>
        </div>

        <div className="user-info">
          <div className="user-avatar">
            {student.fullName.charAt(0)}
          </div>

          <div className="user-details">
            <strong>{student.fullName}</strong>
            <span>Student</span>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* ================= DASHBOARD BODY ================= */}
      <div className="dashboard-layout">

        {/* ================= SIDEBAR ================= */}
        <aside className="sidebar">

          <div className="sidebar-title">
            <span>MENU</span>
          </div>

          <nav className="sidebar-nav">

            <Link to="/student/apply" className="action-btn">
              <span className="action-icon">📝</span>
              <span>Apply for Hostel</span>
            </Link>

            <Link to="/student/payment" className="action-btn">
              <span className="action-icon">💳</span>
              <span>Payment Proof</span>
            </Link>

            <Link to="/student/complaint" className="action-btn">
              <span className="action-icon">🛠️</span>
              <span>Report Complaint</span>
            </Link>

            <Link to="/student/transfer" className="action-btn">
              <span className="action-icon">🔄</span>
              <span>Room Transfer</span>
            </Link>

            <Link
              to="/student/rules"
              state={{ from: "dashboard" }}
              className="action-btn"
            >
            <span className="action-icon">📖</span>
            <span>Hostel Rules</span>
          </Link>

            <Link to="/student/change-password" className="action-btn">
              <span className="action-icon">🔑</span>
              <span>Change Password</span>
            </Link>

          </nav>

        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <main className="dashboard-main">

          {/* Welcome section */}
          <section className="welcome-section">
            <div>
              <h2>
                Welcome, {student.fullName.split(" ")[0]} 👋
              </h2>
            </div>

            <div className="student-status">
              <span className="status-dot"></span>
              Active Student
            </div>
          </section>

          {/* ================= STATUS CARDS ================= */}
          <section className="cards">

            {/* Application */}
            <div className="card">
              <div className="card-top">
                <div>
                  <p className="card-label">HOSTEL APPLICATION</p>
                  <h3>Application Status</h3>
                </div>

                <div className="card-icon application-icon">
                  📝
                </div>
              </div>

              <span
                className={`badge ${statusColor[student.applicationStatus]}`}
              >
                {student.applicationStatus}
              </span>
            </div>

            {/* Room */}
            <div className="card">
              <div className="card-top">
                <div>
                  <p className="card-label">ACCOMMODATION</p>
                  <h3>Room Information</h3>
                </div>

                <div className="card-icon room-icon">
                  🏠
                </div>
              </div>

              {student.room ? (
                <div className="room-info">
                  <strong>{student.room.hostel}</strong>
                  <span>
                    Room {student.room.roomNo}, Bed {student.room.bedNo}
                  </span>
                </div>
              ) : (
                <p className="muted">
                  You haven't been assigned a room yet.
                </p>
              )}
            </div>

            {/* Payment */}
            <div className="card">
              <div className="card-top">
                <div>
                  <p className="card-label">HOSTEL PAYMENT</p>
                  <h3>Payment Status</h3>
                </div>

                <div className="card-icon payment-icon">
                  💳
                </div>
              </div>

              <span
                className={`badge ${statusColor[student.paymentStatus]}`}
              >
                {student.paymentStatus}
              </span>
            </div>

          </section>

          {/* ================= QUICK ACTIONS ================= */}
          <section className="quick-actions">

            <div className="section-heading">
              <div>
                <h2>Quick Actions</h2>
                <p>Manage your hostel services</p>
              </div>
            </div>

            <div className="quick-grid">

              <Link to="/student/apply" className="quick-card">
                <div className="quick-icon">📝</div>
                <div>
                  <h3>Apply for Hostel</h3>
                  <p>Submit your hostel application</p>
                </div>
                <span className="arrow">→</span>
              </Link>

              <Link to="/student/payment" className="quick-card">
                <div className="quick-icon">💳</div>
                <div>
                  <h3>Payment Proof</h3>
                  <p>Upload your payment receipt</p>
                </div>
                <span className="arrow">→</span>
              </Link>

              <Link to="/student/complaint" className="quick-card">
                <div className="quick-icon">🛠️</div>
                <div>
                  <h3>Report Complaint</h3>
                  <p>Report a hostel problem</p>
                </div>
                <span className="arrow">→</span>
              </Link>

              <Link to="/student/transfer" className="quick-card">
                <div className="quick-icon">🔄</div>
                <div>
                  <h3>Room Transfer</h3>
                  <p>Request a room transfer</p>
                </div>
                <span className="arrow">→</span>
              </Link>

              {/* HOSTEL RULES */}
              <Link
                to="/student/rules"
                state={{ from: "dashboard" }}
                className="quick-card"
              >
                <div className="quick-icon">📖</div>
                <div>
                  <h3>Hostel Rules</h3>
                  <p>View hostel rules and regulations</p>
                </div>
                <span className="arrow">→</span>
              </Link>

              <Link to="/student/change-password" className="quick-card">
                <div className="quick-icon">🔑</div>
                <div>
                  <h3>Change Password</h3>
                  <p>Update your account password</p>
                </div>
                <span className="arrow">→</span>
              </Link>

            </div>
          </section>      
        </main>
      </div>
    </div>
  );
}

export default StudentDashboard;