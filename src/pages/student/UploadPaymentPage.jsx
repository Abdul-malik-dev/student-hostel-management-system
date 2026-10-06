import { useState } from "react";
import { Link } from "react-router-dom";
import "./UploadPaymentPage.css";

function UploadPaymentPage() {
  const [file, setFile] = useState(null);
  const [amountPaid, setAmountPaid] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!amountPaid || Number(amountPaid) <= 0) {
      setError("Tafadhali weka kiasi halali ulicholipa.");
      return;
    }

    if (!file) {
      setError("Tafadhali pakia picha au PDF ya risiti ya malipo.");
      return;
    }

    // Hatua ijayo:
    // services/api.js -> uploadPaymentProof(amountPaid, file)

    console.log("Payment upload:", {
      amountPaid,
      file: file.name,
    });

    setSuccess(true);
  };


  /* ================= SUCCESS ================= */

  if (success) {
    return (
      <div className="payment-page">

        <div className="success-box">

          <div className="success-icon">
            ✓
          </div>

          <h2>Risiti Imetumwa</h2>

          <p>
            Risiti yako imepokelewa na malipo yako yako
            chini ya uhakiki.
          </p>

          <p className="success-note">
            Utaarifiwa kupitia Dashboard mara malipo
            yatakapothibitishwa.
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
    <div className="payment-page">

      <div className="payment-container">

        {/* Back */}
        <Link
          to="/student/dashboard"
          className="back-link"
        >
          ← Rudi Dashboard
        </Link>


        <form
          className="payment-form"
          onSubmit={handleSubmit}
        >

          {/* Header */}
          <div className="payment-header">

            <div className="payment-icon">
              💳
            </div>

            <div>
              <h1>Upload Payment Proof</h1>

              <p>
                Pakia risiti ya malipo ya hosteli yako
                kwa ajili ya uhakiki.
              </p>
            </div>

          </div>


          {/* Error */}
          {error && (
            <div className="error-text">
              ⚠️ {error}
            </div>
          )}


          {/* Amount */}
          <div className="form-group">

            <label htmlFor="amountPaid">
              Kiasi Ulicholipa
              <span className="required">*</span>
            </label>

            <div className="amount-input">

              <span className="currency">
                TZS
              </span>

              <input
                id="amountPaid"
                type="number"
                min="1"
                value={amountPaid}
                onChange={(e) =>
                  setAmountPaid(e.target.value)
                }
                placeholder="150000"
              />

            </div>

            <span className="input-hint">
              Weka kiasi halisi kilicho kwenye risiti yako.
            </span>

          </div>


          {/* File upload */}
          <div className="form-group">

            <label htmlFor="paymentReceipt">
              Risiti ya Malipo
              <span className="required">*</span>
            </label>

            <label
              htmlFor="paymentReceipt"
              className="file-upload"
            >

              <div className="upload-icon">
                📎
              </div>

              <div className="upload-text">

                <strong>
                  {file
                    ? "Badilisha risiti"
                    : "Chagua risiti ya malipo"}
                </strong>

                <span>
                  {file
                    ? file.name
                    : "Bonyeza hapa kuchagua picha au PDF"}
                </span>

              </div>

            </label>

            <input
              id="paymentReceipt"
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="file-input"
            />

            <span className="input-hint">
              Inakubali JPG, PNG au PDF.
            </span>

          </div>


          {/* Selected file */}
          {file && (
            <div className="selected-file">

              <div className="file-info">

                <span className="file-icon">
                  📄
                </span>

                <div>
                  <strong>
                    {file.name}
                  </strong>

                  <span>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>

              </div>

              <button
                type="button"
                className="remove-file"
                onClick={() => setFile(null)}
              >
                ×
              </button>

            </div>
          )}


          {/* Submit */}
          <button
            type="submit"
            className="submit-btn"
          >
            💳 Tuma Risiti
          </button>

        </form>

      </div>

    </div>
  );
}

export default UploadPaymentPage;