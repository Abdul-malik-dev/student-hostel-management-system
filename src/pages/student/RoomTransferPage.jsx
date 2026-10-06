import { useState } from "react";
import { Link } from "react-router-dom";
import "./RoomTransferPage.css";

function RoomTransferPage() {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!reason.trim()) {
      setError("Tafadhali eleza sababu ya kuomba kuhamishwa.");
      return;
    }

    // Hatua ijayo:
    // services/api.js -> requestRoomTransfer(reason)

    console.log("Transfer request:", {
      reason,
    });

    setSuccess(true);
  };


  /* ================= SUCCESS ================= */

  if (success) {
    return (
      <div className="transfer-page">

        <div className="success-box">

          <div className="success-icon">
            ✓
          </div>

          <h2>Ombi Limetumwa</h2>

          <p>
            Ombi lako la kuhamishwa chumba limepokelewa
            na linasubiri idhini ya Admin.
          </p>

          <p className="success-note">
            Utaarifiwa kupitia Dashboard mara Admin
            atakapofanya uamuzi.
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
    <div className="transfer-page">

      <div className="transfer-container">

        {/* Back */}
        <Link
          to="/student/dashboard"
          className="back-link"
        >
          ← Rudi Dashboard
        </Link>


        <form
          className="transfer-form"
          onSubmit={handleSubmit}
        >

          {/* Header */}
          <div className="transfer-header">

            <div className="transfer-icon">
              🔄
            </div>

            <div>
              <h1>Request Room Transfer</h1>

              <p>
                Eleza sababu ya kuomba kuhamishwa
                kutoka chumba chako cha sasa.
              </p>
            </div>

          </div>


          {/* Information */}
          <div className="info-box">
            <span className="info-icon">ℹ️</span>

            <p>
              Ombi lako litatumwa kwa Admin kwa ajili
              ya uhakiki na idhini.
            </p>
          </div>


          {/* Error */}
          {error && (
            <div className="error-text">
              ⚠️ {error}
            </div>
          )}


          {/* Reason */}
          <div className="form-group">

            <label htmlFor="reason">
              Sababu ya Kuhamishwa
              <span className="required">*</span>
            </label>

            <textarea
              id="reason"
              value={reason}
              onChange={(e) =>
                setReason(e.target.value)
              }
              placeholder="Eleza sababu yako kwa undani..."
              rows="6"
            />

            <span className="input-hint">
              Mfano: Tatizo la afya, mazingira ya chumba,
              usalama, au sababu nyingine muhimu.
            </span>

          </div>


          {/* Submit */}
          <button
            type="submit"
            className="submit-btn"
          >
            🔄 Tuma Ombi la Kuhamishwa
          </button>

        </form>

      </div>

    </div>
  );
}

export default RoomTransferPage;