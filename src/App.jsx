import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

import StudentDashboard from "./pages/student/StudentDashboard";
import RulesPage from "./pages/student/RulesPage";
import ApplyHostelPage from "./pages/student/ApplyHostelPage";
import UploadPaymentPage from "./pages/student/UploadPaymentPage";
import ComplaintPage from "./pages/student/ComplaintPage";
import RoomTransferPage from "./pages/student/RoomTransferPage";
import ChangePasswordPage from "./pages/student/ChangePasswordPage";

import WardenDashboard from "./pages/warden/WardenDashboard";
import WardenRoomsBeds from "./pages/warden/WardenRoomsBeds";

import "./App.css";


function ProtectedRoute({ role, children }) {
  const savedUser = localStorage.getItem("shmsUser");

  if (!savedUser) {
    return <Navigate to="/" replace />;
  }

  try {
    const user = JSON.parse(savedUser);

    if (role && user.role !== role) {
      return <Navigate to="/" replace />;
    }

    return children;

  } catch (error) {
    localStorage.removeItem("shmsUser");
    return <Navigate to="/" replace />;
  }
}


function App() {
  return (
    <Routes>

      {/* =========================
          AUTHENTICATION
      ========================= */}

      <Route
        path="/"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPasswordPage />}
      />


      {/* =========================
          STUDENT
      ========================= */}

      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute role="STUDENT">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/rules"
        element={<RulesPage />}
      />

      <Route
        path="/student/apply"
        element={<ApplyHostelPage />}
      />

      <Route
        path="/student/payment"
        element={<UploadPaymentPage />}
      />

      <Route
        path="/student/complaint"
        element={<ComplaintPage />}
      />

      <Route
        path="/student/transfer"
        element={<RoomTransferPage />}
      />

      <Route
        path="/student/change-password"
        element={<ChangePasswordPage />}
      />


      {/* =========================
          WARDEN
      ========================= */}

      <Route
        path="/warden/dashboard"
        element={
          <ProtectedRoute role="WARDEN">
            <WardenDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/warden/rooms"
        element={
          <ProtectedRoute role="WARDEN">
            <WardenRoomsBeds />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;