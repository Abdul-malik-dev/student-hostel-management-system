import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter your username and password.");
      return;
    }

    try {
        console.log("USERNAME:", username);
        console.log("PASSWORD LENGTH:", password.length);

      const response = await fetch(
        "http://127.0.0.1:8000/api/auth/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      const data = await response.json();
        console.log("LOGIN STATUS:", response.status);
        console.log("LOGIN RESPONSE:", data);

      if (!response.ok) {
        setError(
          data.detail || "Invalid username or password."
        );
        return;
      }

      localStorage.setItem(
        "shmsUser",
        JSON.stringify({
          username: data.username,
          role: data.role,
        })
      );
        // Login successful
        if (data.role === "STUDENT") {
          navigate("/student/dashboard");
        } else if (data.role === "WARDEN") {
          navigate("/warden/dashboard");
        } else if (data.role === "ADMIN") {
          navigate("/admin/dashboard");
        } else {
          setError("User role is not recognized.");
        }

    } catch (error) {
      setError(
        "Unable to connect to the server. Please make sure Django is running."
      );
    }
  };

  return (
    <div className="login-page">
      <form
        className="login-form"
        onSubmit={handleSubmit}
      >

        {/* Logo */}
        <div className="login-logo">
          <div className="house-roof"></div>

          <div className="house-body">
            <div className="house-door"></div>
          </div>
        </div>

        {/* Header */}
        <div className="login-header">
          <h1>SHMS</h1>

          <p>
            Student Hostel Management System
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="error-text">
            ⚠️ {error}
          </div>
        )}

        {/* Username */}
        <div className="login-field">
          <label htmlFor="username">
            Username
          </label>

          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            placeholder="Enter your username"
            autoComplete="username"
          />
        </div>

        {/* Password */}
        <div className="login-field">
          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            placeholder="Enter your password"
            autoComplete="current-password"
          />
        </div>

        {/* Forgot Password */}
        <div className="forgot-password">
          <Link to="/forgot-password">
            Forgot Password?
          </Link>
        </div>

        {/* Login */}
        <button
          type="submit"
          className="login-btn"
        >
          Login
        </button>

        {/* Register */}
        <div className="create-account">
          <span>New student?</span>{" "}
          <Link to="/register">
            Create Account
          </Link>
        </div>

      </form>
    </div>
  );
}

export default LoginPage;