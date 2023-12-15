import express from "express";
import { patientRegister, doctorRegister, pharmacistRegister, login, logout, forgotPassword, resetPassword,
         viewMedicines, searchMedicine, filterMedicine, viewMonthSales } from "../controllers/userController.js";

//router initialization
const router = express.Router();

// (Req 1) As a guest register as a patient using username, name, email, password, date of birth, gender, mobile number, emergency contact ( full name, mobile number, relation)
router.post('/patient-register', patientRegister);

// (Req 3) As a guest submit a request to register as doctor using username, name, email, password, date of birth, hourly rate, affiliation (hospital), educational background
router.post('/doctor-register', doctorRegister);

// (Req 2) As a guest submit a request to register as a pharmacist using username, name, email, password, date of birth, hourly rate, affiliation (hospital), educational background, 
router.post("/pharmacist-register", pharmacistRegister);

// (Req 5) As a user login with username and password
router.post('/login',login);

// (Req 6) As a user logout
router.get('/logout',logout);

// (Req 12) As a user change my password
router.post('/reset-password', resetPassword);

// (Req 13) As a user reset a forgotten password through OTP sent to email
router.post('/forgot-password', forgotPassword);

// (Req 12) As a user (Patient/Pharmacist/Administrator) view a list of all available medicines (including picture of medicine, price, description)
router.get('/available-medicines', viewMedicines);

// (Req 14) As a user (Patient/Pharmacist/Administrator) search for medicine based on name
router.get('/search-medicine', searchMedicine);

// (Req 15) As a user (Patient/Pharmacist/Administrator) filter medicines based on medicinal use
router.get('/filter-medicines', filterMedicine);

// (Req 20) As an Adminstrator / Pharmacist view a total sales report based on a chosen month
router.get("/month-sales", viewMonthSales);

export default router;