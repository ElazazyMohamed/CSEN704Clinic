import "../styles/doctor.css";
import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import ChangePasswordForm from "../components/ChangePasswordForm";

import LinkFamily from "../components/linkFamily";
export default function Patient() {
  return (
    <>
      <div className="Upper-Section">
        <LogoutButton />

        <div className="role-buttons">
          <h1 className="title">Patient Home</h1>
          <Link to="/patient/appointments" className="button">
            Appointments
          </Link>
          <Link to="/patient/familymembers" className="button">
            Family Members
          </Link>
          <Link to="/patient/prescriptions" className="button">
            Prescriptions
          </Link>
          <Link to="/patient/doctors" className="button">
            Doctors
          </Link>
          <Link to="/patient/packages" className="button">
            Packages
          </Link><Link to="/patient/wallet" className="button">
            Wallet
          </Link>
          <Link to="/patient/pay-appointment" className="button">
            Pay For Appointments
          </Link>
        <LinkFamily/>
        </div>
        <ChangePasswordForm/>
      </div>
    </>
  );
}
