import { useState } from "react";
import { Link } from "react-router-dom";
import "./ApplyHostelPage.css";

function ApplyHostelPage() {
  const [formData, setFormData] = useState({
    firstYear: "",
    disability: "",
    distantRegion: "",
    international: "",
    extraInfo: "",
  });

  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.firstYear ||
      !formData.disability ||
      !formData.distantRegion ||
      !formData.international
    ) {
      setError("Please answer all required questions.");
      return;
    }

    if (!agreed) {
      setError("Please accept the hostel rules before submitting.");
      return;
    }

    console.log("Application data:", formData);

    setSuccess(true);
  };

  /* ================= SUCCESS PAGE ================= */

  if (success) {
    return (
      <div className="apply-page">
        <div className="success-box">

          <div className="success-icon">
            ✓
          </div>

          <h2>Application Submitted</h2>

          <p>
            Your hostel application has been submitted successfully.
            You will receive an update through your student dashboard.
          </p>

          <Link
            to="/student/dashboard"
            className="back-link-btn"
          >
            ← Back to Dashboard
          </Link>

        </div>
      </div>
    );
  }

  /* ================= APPLICATION FORM ================= */

  return (
    <div className="apply-page">

      <div className="apply-container">

        {/* Back button */}
        <Link
          to="/student/dashboard"
          className="back-link"
        >
          ← Back to Dashboard
        </Link>

        {/* Form card */}
        <form
          className="apply-form"
          onSubmit={handleSubmit}
        >

          {/* Header */}
          <div className="form-header">

            <div className="form-icon">
              📝
            </div>

            <div>
              <h1>Apply for Hostel</h1>

              <p>
                Please provide the information below to apply
                for university hostel accommodation.
              </p>
            </div>

          </div>


          {/* Error */}
          {error && (
            <div className="error-text">
              ⚠️ {error}
            </div>
          )}


          {/* ================= QUESTIONS ================= */}

          <div className="form-section">

            <h3>Student Information</h3>

            <p className="section-description">
              Answer the following questions accurately.
            </p>


            {/* First year */}
            <div className="form-group">

              <label htmlFor="firstYear">
                Are you a first-year student?
                <span className="required">*</span>
              </label>

              <select
                id="firstYear"
                name="firstYear"
                value={formData.firstYear}
                onChange={handleChange}
              >
                <option value="">
                  Select an option
                </option>

                <option value="yes">
                  Yes
                </option>

                <option value="no">
                  No
                </option>
              </select>

            </div>


            {/* Disability */}
            <div className="form-group">

              <label htmlFor="disability">
                Do you have a disability?
                <span className="required">*</span>
              </label>

              <select
                id="disability"
                name="disability"
                value={formData.disability}
                onChange={handleChange}
              >
                <option value="">
                  Select an option
                </option>

                <option value="yes">
                  Yes
                </option>

                <option value="no">
                  No
                </option>
              </select>

            </div>


            {/* Distant region */}
            <div className="form-group">

              <label htmlFor="distantRegion">
                Do you come from a distant region?
                <span className="required">*</span>
              </label>

              <select
                id="distantRegion"
                name="distantRegion"
                value={formData.distantRegion}
                onChange={handleChange}
              >
                <option value="">
                  Select an option
                </option>

                <option value="yes">
                  Yes
                </option>

                <option value="no">
                  No
                </option>
              </select>

            </div>


            {/* International */}
            <div className="form-group">

              <label htmlFor="international">
                Are you an international student?
                <span className="required">*</span>
              </label>

              <select
                id="international"
                name="international"
                value={formData.international}
                onChange={handleChange}
              >
                <option value="">
                  Select an option
                </option>

                <option value="yes">
                  Yes
                </option>

                <option value="no">
                  No
                </option>
              </select>

            </div>


            {/* Extra information */}
            <div className="form-group">

              <label htmlFor="extraInfo">
                Additional Information
                <span className="optional">
                  Optional
                </span>
              </label>

              <textarea
                id="extraInfo"
                name="extraInfo"
                value={formData.extraInfo}
                onChange={handleChange}
                placeholder="Enter any additional information you would like us to know..."
                rows="4"
              />

            </div>

          </div>


          {/* ================= AGREEMENT ================= */}

          <div className="agreement-box">

            <label className="checkbox-row">

              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) =>
                  setAgreed(e.target.checked)
                }
              />

              <span>
                I confirm that the information I have provided
                is correct and I agree to follow the
                <Link to="/student/rules">
                  hostel rules and regulations
                </Link>.
              </span>

            </label>

          </div>


          {/* Submit */}

          <button
            type="submit"
            className="submit-btn"
          >
            Submit Application
          </button>

        </form>

      </div>

    </div>
  );
}

export default ApplyHostelPage;