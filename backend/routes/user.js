import express from "express";
import { patientRegister, doctorRegister, uploadDocuments, login, logout, forgotPassword, 
    resetPassword } from "../controllers/userController.js";

//router initialization
const router = express.Router();

// (Req 1) As a guest register as a patient using username, name, email, password, date of birth, gender, mobile number, emergency contact ( full name , mobile number)
router.post('/patient/register', patientRegister);

// (Req 3) As a guest submit a request to register as doctor using username, name, email, password, date of birth, hourly rate, affiliation (hospital), educational background
router.post('/doctor/register', doctorRegister);

// (Req 4) As a guest upload and submit required documents upon registrationas a doctor such as ID, Medical licenses and medical degree 
router.post("/doctor/upload-documents/:requestId", uploadDocuments);

router.post('/login',login);

router.get('/logout',logout)

router.post('/forgotPassword', forgotPassword);

router.post('/resetPassword', resetPassword);

export default router