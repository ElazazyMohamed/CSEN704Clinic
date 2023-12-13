import express from "express";
import { addAdmin, removeUser, getRegisteredDoctorsRequests, getRegisteredPharmacistsRequests, acceptRegisteredDoctor, 
         acceptRegisteredPharmacist, rejectRegisteredPharmacist, getPendDoctorRequests, acceptPendDoctor, 
         rejectPendDoctor, viewPatientInfo, viewPharmacistInfo } from "../controllers/adminController.js";

//router initialization
const router = express.Router();

// (Req 7) As a admin add another adminstrator with a set username and password
router.post('/add-admin',addAdmin);

// (Req 8) As a admin remove a doctor/ patient / Admin from the system
router.delete('/remove-user', removeUser);

// (Req 9) As an admin view all of the information uploaded by a doctor to apply to join the platform
router.get("/registered-doctors-requests", getRegisteredDoctorsRequests);

// (Req 7) As an admin view all of the information uploaded by a pharmacist to apply to join the platform
router.get("/registered-pharmacist-requests", getRegisteredPharmacistsRequests);

// (Req 15) As an admin accept a request for the registration of a doctor
router.patch("/accept-doctor-register/:username", acceptRegisteredDoctor);

// (Req 8) accept the request of a pharmacist to join the platform
router.patch("/accept-pharmacist-register/:username", acceptRegisteredPharmacist);

// (Req 8) reject the request of a pharmacist to join the platform
router.patch("/reject-pharmacist-register/:username", rejectRegisteredPharmacist);

// (Req 10) helper
router.get("/pending-doctors-requests", getPendDoctorRequests);

// (Req 10) accept the request of a doctor to join the platform
router.patch("/accept-doctor-pending/:username", acceptPendDoctor);

// (Req 10) reject the request of a doctor to join the platform
router.patch("/reject-doctor-pending/:username", rejectPendDoctor);

// (Req 23) view a patients's basic information
router.get("/patients", viewPatientInfo);

// (Req 22) view a pharmacist's information
router.get("/pharmacist", viewPharmacistInfo);

export default router;