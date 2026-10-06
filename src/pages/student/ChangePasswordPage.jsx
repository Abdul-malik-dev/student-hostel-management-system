import { useState } from "react";
import { Link } from "react-router-dom";
import "./ChangePasswordPage.css";

function ChangePasswordPage() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const {
      oldPassword,
      newPassword,
      confirmPassword,
    } = formData;

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("Tafadhali jaza taarifa zote.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password mpya lazima iwe na angalau herufi 6.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Password mpya hazifanani.");
      return;
    }

    if (oldPassword === newPassword) {
      setError(
        "Password mpya lazima iwe tofauti na password ya sasa."
      );
      return;
    }

    // Later connect this to your backend API
    console.log("Change password:", formData);

    setSuccess(true);
  };

  /* SUCCESS */
  if (success) {
    return (
      <div className="password-page">
        <div className="password-modal success-modal">

          <div className="success-icon">
            ✓
          </div>

          <h2>Password Imebadilishwa</h2>

          <p>
            Password yako mpya imehifadhiwa kwa mafanikio.
          </p>

          <p className="success-note">
            Sasa unaweza kutumia password yako mpya
            kuingia kwenye mfumo.
          </p>

          <Link
            to="/student/dashboard"
            className="dashboard-btn"
          >
            ← Rudi Dashboard
          </Link>

        </div>
      </div>
    );
  }

  return (
    <div className="password-page">

      <div className="password-modal">

        {/* Top */}
        <div className="password-top">

          <Link
            to="/student/dashboard"
            className="close-btn"
            title="Close"
          >
            ×
          </Link>

          <div className="password-icon">
            🔐
          </div>

          <h1>Badilisha Password</h1>

          <p>
            Badilisha password yako ili kuweka account
            yako salama.
          </p>

        </div>

        {/* Error */}
        {error && (
          <div className="error-text">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Current password */}
          <div className="password-field">

            <label htmlFor="oldPassword">
              Password ya Sasa
              <span>*</span>
            </label>

            <input
              id="oldPassword"
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              placeholder="Weka password ya sasa"
              autoComplete="current-password"
            />

          </div>

          {/* New password */}
          <div className="password-field">

            <label htmlFor="newPassword">
              Password Mpya
              <span>*</span>
            </label>

            <input
              id="newPassword"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Weka password mpya"
              autoComplete="new-password"
            />

            <small>
              Angalau herufi 6.
            </small>

          </div>

          {/* Confirm password */}
          <div className="password-field">

            <label htmlFor="confirmPassword">
              Rudia Password Mpya
              <span>*</span>
            </label>

            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Rudia password mpya"
              autoComplete="new-password"
            />

          </div>

          {/* Security message */}
          <div className="security-message">
            <span>🔒</span>

            <div>
              <strong>Usalama wa Account</strong>

              <p>
                Usimshirikishe mtu mwingine password yako.
              </p>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="change-password-btn"
          >
            🔐 Badilisha Password
          </button>

        </form>

      </div>

    </div>
  );
}

export default ChangePasswordPage;