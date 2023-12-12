import express from "express";
import { updateDoctor, searchPatient, getRegisteredPatients, filterPatientsUpcomingAppointments, selectPatient, viewRegisteredPatient, getappointments, viewHealthRecords, addhealthrecord, addAvailableTimeSlot, getWallet,reservefollowup } from "../controllers/doctorController.js";
import {viewContract, acceptContract} from "../controllers/employmentContractController.js";

//router initialization
const router = express.Router();

// (Req 14) edit/ update my email, hourly rate or affiliation (hospital)
router.patch('/updateDoctor',updateDoctor);

// (Req 34) search for a patient by name
router.get("/searchPatient", searchPatient);

// (Req 33) view a list of all my patients
router.get("/getRegisteredPatients", getRegisteredPatients);

router.get("/getRegisteredPatients/filterPatientsUpcomingAppointments", filterPatientsUpcomingAppointments);

router.get("/getRegisteredPatients/selectPatient", selectPatient);

router.get("/getRegisteredPatients/filterPatientsUpcomingAppointments/selectPatient", selectPatient);

router.get("/getRegisteredPatients/selectPatient/viewRegisteredPatient", viewRegisteredPatient)




router.post('/reservefollowup',reservefollowup)

router.get('/getappointments',getappointments)

// router.post('/',createDoctor);

// router.delete('/',deleteDoctor);

//16
router.get("/:doctorId/:clinicId", viewContract);
router.patch("/accept/:doctorId/:clinicId", acceptContract);

//17
// Add a new route for adding available time slots
router.post("/add-available-time-slot", addAvailableTimeSlot);

router.get("/wallet",getWallet);

//24
router.get("/healthrecords/:patientId", viewHealthRecords);
router.post("/healthrecords/:patientId", addhealthrecord);

export default router