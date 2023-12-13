import express from "express";
import { patientRegister, doctorRegister, pharmacistRegister, uploadDoctorDocuments, uploadPharmacistDocuments, 
         login, logout, forgotPassword, resetPassword } from "../controllers/userController.js";

//router initialization
const router = express.Router();

// (Req 1) As a guest register as a patient using username, name, email, password, date of birth, gender, mobile number, emergency contact ( full name, mobile number, relation)
router.post('/patient/register', patientRegister);

// (Req 3) As a guest submit a request to register as doctor using username, name, email, password, date of birth, hourly rate, affiliation (hospital), educational background
router.post('/doctor/register', doctorRegister);

// (Req 2) As a guest submit a request to register as a pharmacist using username, name, email, password, date of birth, hourly rate, affiliation (hospital), educational background, 
router.post("/pharmacist/register", pharmacistRegister);

// (Req 5) As a user login with username and password
router.post('/login',login);

// (Req 6) As a user logout
router.get('/logout',logout);

// (Req 12) As a user change my password
router.post('/reset-password', resetPassword);

// (Req 13) As a user reset a forgotten password through OTP sent to email
router.post('/forgot-password', forgotPassword);

export default router