import { useState } from "react";
import { Link } from "react-router-dom";

import PhoneInput, {
  isValidPhoneNumber,
} from "react-phone-number-input";

import "react-phone-number-input/style.css";
import "./RegisterPage.css";

function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle normal inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setError("");
    setSuccess("");
  };

  // Handle phone number
  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      phone: value || "",
    });

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const {
      fullName,
      username,
      phone,
      email,
      password,
      confirmPassword,
    } = formData;

    // Required fields
    if (
      !fullName ||
      !username ||
      !phone ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("Please complete all required information.");
      return;
    }

    // Phone validation
    if (!isValidPhoneNumber(phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    // Password length
    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    // Password confirmation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Hostel rules
    if (!agreed) {
      setError("Please accept the hostel rules and regulations.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8000/api/auth/register/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            full_name: fullName,
            username: username,
            phone: phone,
            email: email,
            password: password,
            confirm_password: confirmPassword,
          }),
        }
      );

      const data = await response.json();

      // Backend error
      if (!response.ok) {
        setError(
          data.username?.[0] ||
            data.email?.[0] ||
            data.phone?.[0] ||
            data.confirm_password?.[0] ||
            data.detail ||
            "Registration failed."
        );

        return;
      }

      // Success
      alert("Account created successfully. You can now login.");

      setFormData({
        fullName: "",
        username: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setAgreed(false);

      navigate("/");
      setAgreed(false);
    } catch (error) {
      setError(
        "Unable to connect to the server. Please make sure Django is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <form
        className="register-form"
        onSubmit={handleSubmit}
      >
        {/* HEADER */}
        <div className="register-header">
          <div className="register-logo">
            SHMS
          </div>

          <h1>Create Student Account</h1>

          <p>
            Create your account to access the Student Hostel
            Management System.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="error-text">
            ⚠️ {error}
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div className="success-text">
            ✓ {success}
          </div>
        )}

        {/* PERSONAL INFORMATION */}
        <div className="form-section">
          <h3>Personal Information</h3>

          {/* FULL NAME */}
          <div className="field">
            <label htmlFor="fullName">
              Full Name <span>*</span>
            </label>

            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Abdulmalik Ali"
              autoComplete="name"
            />
          </div>

          {/* USERNAME + PHONE */}
          <div className="row">
            {/* USERNAME */}
            <div className="field">
              <label htmlFor="username">
                Username <span>*</span>
              </label>

              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="e.g. abdulmalik"
                autoComplete="username"
              />
            </div>

            {/* PHONE */}
            <div className="field">
              <label htmlFor="phone">
                Phone Number <span>*</span>
              </label>

              <PhoneInput
                id="phone"
                international
                defaultCountry="TZ"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="Enter phone number"
              />

              <small>
                Select your country and enter your phone number.
              </small>
            </div>
          </div>

          {/* EMAIL */}
          <div className="field">
            <label htmlFor="email">
              Email Address <span>*</span>
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="student@example.com"
              autoComplete="email"
            />
          </div>
        </div>

        {/* ACCOUNT SECURITY */}
        <div className="form-section">
          <h3>Account Security</h3>

          <div className="row">
            {/* PASSWORD */}
            <div className="field">
              <label htmlFor="password">
                Password <span>*</span>
              </label>

              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                autoComplete="new-password"
              />

              <small>
                At least 6 characters.
              </small>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="field">
              <label htmlFor="confirmPassword">
                Confirm Password <span>*</span>
              </label>

              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat password"
                autoComplete="new-password"
              />
            </div>
          </div>
        </div>

        {/* HOSTEL RULES */}
        <label className="terms-row">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => {
              setAgreed(e.target.checked);
              setError("");
            }}
          />

          <Link
            to="/student/rules"
            state={{ from: "register" }}
          >
            Read Hostel Rules & Regulations
          </Link>
        </label>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="register-btn"
          disabled={loading}
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </button>

        {/* LOGIN LINK */}
        <p className="login-link">
          Already have an account?{" "}
          <Link to="/">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;