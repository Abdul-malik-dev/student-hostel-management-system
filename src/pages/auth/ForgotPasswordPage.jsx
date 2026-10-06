import { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPasswordPage.css";

function ForgotPasswordPage() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!username || !phone || !email) {
      setError("Please complete all information.");
      return;
    }

    // Temporary frontend test
    setMessage(
      "Account information submitted successfully. Password reset will be connected to Django."
    );
  };

  return (
    <div className="forgot-page">
      <form className="forgot-form" onSubmit={handleSubmit}>

        <div className="forgot-logo">
          🏠
        </div>

        <div className="forgot-header">
          <h1>Forgot Password?</h1>

          <p>
            Verify your account information to reset your password.
          </p>
        </div>

        {error && (
          <div className="forgot-error">
            ⚠️ {error}
          </div>
        )}

        {message && (
          <div className="forgot-success">
            ✓ {message}
          </div>
        )}

        <div className="forgot-field">
          <label>Username</label>

          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
              setMessage("");
            }}
            placeholder="Enter your username"
          />
        </div>

        <div className="forgot-field">
          <label>Phone Number</label>

          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setError("");
              setMessage("");
            }}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="forgot-field">
          <label>Email Address</label>

          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
              setMessage("");
            }}
            placeholder="Enter your email"
          />
        </div>

        <button type="submit" className="forgot-btn">
          Verify Account
        </button>

        <div className="back-login">
          <Link to="/">
            ← Back to Login
          </Link>
        </div>

      </form>
    </div>
  );
}

export default ForgotPasswordPage;