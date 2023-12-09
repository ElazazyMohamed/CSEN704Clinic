import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import PatientRegistrationForm from "./pages/patientRegistration.js";
import DoctorRegistrationForm from "./pages/doctorRegistration.js";
import LandingPage from "./pages/LandingPage.js";
import AdminPanel from "./pages/admin.js";
import Patient from "./pages/patient.js";
import Doctor from "./pages/doctor.js";
import Packages from "./pages/packages.js";
import PatientFamilyMembers from "./pages/patientFamilyMembers.js";
import AppointmentsTable from "./components/appointments.js";
import PatientPrescriptions from "./pages/patientPrescriptions.js";
import PatientPackages from "./pages/patientPackages.tsx";
import PatientDoctors from "./pages/patientDoctor.js";
import Login from "./pages/login.js";
import ForgotPassword from "./pages/forgotPassword.js";
import ResetPassword from "./pages/ResetPassword.js";
import RoleContext from "./pages/RoleContext.js";
import UsernameContext from "./pages/UsernameContext.js";
import Wallet from "./pages/wallet.js";
import PayAppointment from "./components/payAppointment.js";
import TheirRecords from "./pages/theirHealthRecords.js";
import MyRecords from "./pages/MyRecords.js";

function App() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  return (
    <div className="App">
    <UsernameContext.Provider value={{ username, setUsername }}>
    <RoleContext.Provider value={{ role, setRole }}>  
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgotPassword" element={<ForgotPassword/>}/>
            <Route path="/resetPassword" element={<ResetPassword/>} />

            <Route path="/" element={<LandingPage />} />
            <Route
              path="/patient/register"
              element={<PatientRegistrationForm />}
            />
            <Route
              path="/doctor/register"
              element={<DoctorRegistrationForm />}
            />
            <Route path="/admin/home" element={<AdminPanel />} />
            <Route path="/patient/home" element={<Patient />} />
            <Route path="/doctor/home" element={<Doctor />} />
            <Route path="/admin/packages" element={<Packages />} />
            <Route
              path="/patient/appointments"
              element={<AppointmentsTable />}
            />
            <Route
              path="/patient/familymembers"
              element={<PatientFamilyMembers />}
            />
            <Route
              path="/patient/prescriptions"
              element={<PatientPrescriptions />}
            />
            <Route path="/patient/packages" element={<PatientPackages />} />
            <Route path="/patient/doctors" element={<PatientDoctors />} />
            <Route path="/doctor/wallet" element={<Wallet />} />
            <Route path="/patient/wallet" element={<Wallet />} />
            <Route path="/patient/pay-appointment" element={<PayAppointment />} />
            <Route path="/patient/records" element={<MyRecords />} />
            <Route path="/doctor/records/:patientId" element={<TheirRecords />} />
          </Routes>
        </div>
      </BrowserRouter>
      </RoleContext.Provider>
      </UsernameContext.Provider>
    </div>
  );
}

export default App;
