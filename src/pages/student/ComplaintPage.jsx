import { useState } from "react";
import { Link } from "react-router-dom";
import "./ComplaintPage.css";

function ComplaintPage() {
  const [complaintType, setComplaintType] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!complaintType || !description.trim()) {
      setError("Tafadhali jaza taarifa zote zinazohitajika.");
      return;
    }

    // Hatua ijayo:
    // services/api.js -> submitComplaint(complaintType, description)

    console.log("Complaint:", {
      complaintType,
      description,
    });

    setSuccess(true);
  };

  /* ================= SUCCESS ================= */

  if (success) {
    return (
      <div className="complaint-page">

        <div className="success-box">

          <div className="success-icon">
            ✓
          </div>

          <h2>Malalamiko Yametumwa</h2>

          <p>
            Malalamiko yako yamepokelewa na yatashughulikiwa
            hivi karibuni.
          </p>

          <Link
            to="/student/dashboard"
            className="back-link-btn"
          >
            ← Rudi Dashboard
          </Link>

        </div>

      </div>
    );
  }

  /* ================= FORM ================= */

  return (
    <div className="complaint-page">

      <div className="complaint-container">

        {/* Back */}
        <Link
          to="/student/dashboard"
          className="back-link"
        >
          ← Rudi Dashboard
        </Link>

        <form
          className="complaint-form"
          onSubmit={handleSubmit}
        >

          {/* Header */}
          <div className="complaint-header">

            <div className="complaint-icon">
              🛠️
            </div>

            <div>
              <h1>Report Complaint</h1>

              <p>
                Eleza tatizo unalokutana nalo chumbani
                au hostelini.
              </p>
            </div>

          </div>


          {/* Error */}
          {error && (
            <div className="error-text">
              ⚠️ {error}
            </div>
          )}


          {/* Complaint type */}
          <div className="form-group">

            <label htmlFor="complaintType">
              Aina ya Tatizo
              <span className="required">*</span>
            </label>

            <select
              id="complaintType"
              value={complaintType}
              onChange={(e) =>
                setComplaintType(e.target.value)
              }
            >

              <option value="">
                Chagua aina ya tatizo...
              </option>

              <option value="plumbing">
                Bomba / Maji
              </option>

              <option value="electrical">
                Umeme
              </option>

              <option value="furniture">
                Samani (kitanda, meza, n.k.)
              </option>

              <option value="cleanliness">
                Usafi
              </option>

              <option value="security">
                Usalama
              </option>

              <option value="other">
                Nyingine
              </option>

            </select>

          </div>


          {/* Description */}
          <div className="form-group">

            <label htmlFor="description">
              Maelezo ya Tatizo
              <span className="required">*</span>
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Eleza tatizo kwa undani..."
              rows="6"
            />

            <span className="input-hint">
              Tafadhali eleza tatizo kwa ufasaha ili
              liwe rahisi kushughulikiwa.
            </span>

          </div>


          {/* Submit */}
          <button
            type="submit"
            className="submit-btn"
          >
            📨 Tuma Malalamiko
          </button>

        </form>

      </div>

    </div>
  );
}

export default ComplaintPage;