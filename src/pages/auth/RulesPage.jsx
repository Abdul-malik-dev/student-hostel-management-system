import { Link } from "react-router-dom";
import "./RulesPage.css";

function RulesPage() {
  return (
    <div className="rules-page">
      <div className="rules-box">
        <Link to="/auth/RegisterPage" className="back-link">
          ← Back Dashboard
        </Link>
        <h2>Rules and instruction of hostel</h2>

        <ul className="rules-list">
          <li>
            <strong>Allocation Priority:</strong> Student of First year, have
            disability, wanaotoka mikoa ya mbali, wa kimataifa, na wenye matatizo maalum ya
            kiafya/kijamii hupewa kipaumbele katika upangaji wa vyumba.
          </li>
          <li>
            <strong>Gender Separation:</strong> Wanafunzi wa kiume na wa kike wanapaswa
            kukaa kwenye blocks/sections tofauti muda wote.
          </li>
          <li>
            <strong>Room Capacity:</strong> Idadi ya wanafunzi kwenye chumba haipaswi
            kuzidi uwezo wake (vitanda 4 au 6).
          </li>
          <li>
            <strong>Payment before Key Issuance:</strong> Funguo la chumba halitatolewa
            mpaka malipo yathibitishwe kwenye mfumo na fomu ya hali ya chumba ijazwe.
          </li>
          <li>
            <strong>Damage Fines:</strong> Uharibifu wowote utakaogundulika wakati wa
            check-out utalinganishwa na hali iliyorekodiwa wakati wa check-in, na faini
            itatozwa ipasavyo.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default RulesPage;