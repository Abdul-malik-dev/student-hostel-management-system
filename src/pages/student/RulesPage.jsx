import { useLocation, useNavigate } from "react-router-dom";
import "./RulesPage.css";

function RulesPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from;

  const handleBack = () => {
    if (from === "dashboard") {
      navigate("/student/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="rules-page">
      <div className="rules-box">

        <button
          type="button"
          onClick={handleBack}
          className="back-link"
        >
          {from === "dashboard"
            ? "← Return to Dashboard"
            : "← Back to Create Account"}
        </button>

        <h2>Rules and Instructions of Hostel</h2>

        <ul className="rules-list">
          <li>
            <strong>Allocation Priority:</strong> Student of First year, have
            disability, wanaotoka mikoa ya mbali, wa kimataifa, na wenye
            matatizo maalum ya kiafya/kijamii hupewa kipaumbele katika upangaji
            wa vyumba.
          </li>

          <li>
            <strong>Gender Separation:</strong> Wanafunzi wa kiume na wa kike
            wanapaswa kukaa kwenye blocks/sections tofauti muda wote.
          </li>

          <li>
            <strong>Room Capacity:</strong> Idadi ya wanafunzi kwenye chumba
            haipaswi kuzidi uwezo wake (vitanda 4 au 6).
          </li>

          <li>
            <strong>Payment before Key Issuance:</strong> Funguo la chumba
            halitatolewa mpaka malipo yathibitishwe kwenye mfumo na fomu ya
            hali ya chumba ijazwe.
          </li>

          <li>
            <strong>Damage Fines:</strong> Uharibifu wowote utakaogundulika
            wakati wa check-out utalinganishwa na hali iliyorekodiwa wakati wa
            check-in, na faini itatozwa ipasavyo.
          </li>
        </ul>

      </div>
    </div>
  );
}

export default RulesPage;