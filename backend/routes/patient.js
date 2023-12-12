import express, { json } from "express";
import { setFamilyMember, getFamilyMembers, 
         getDoctorsNameSpecialitySessionPrice, getDoctorNameSpeciality, filterDoctorsSpecialityAvailability, 
         selectDoctor, getPrescriptions, addPrescription, filterPrescription, selectPrescription,
         uploadHealthRecord, removeHealthRecord, viewHealthRecords, getAppointments, 
         filterAppointmentsDateStatus, getWallet, linkFamily, payAppointment, payAppointment2, payPackage
         , payPackage2 } from "../controllers/patientController.js";
import upload from "../Middleware/multer.js";

//router initialization
const router = express.Router();

//add family members
router.patch("/setFamilyMember", setFamilyMember);

//get family members
router.get("/getFamilyMembers", getFamilyMembers);

// View doctors names, speciality and sessionPrice
router.get("/getDoctorsNameSpecialitySessionPrice", getDoctorsNameSpecialitySessionPrice);

// search doctor name and or or speciality 
router.get("/getDoctorNameSpeciality", getDoctorNameSpeciality);

// filter doctors speciality and or or availability on certain date and at specific time
router.get("/filterDoctorsSpecialityAvailability", filterDoctorsSpecialityAvailability);

// select a doctor from the search or the filter
router.get("/selectDoctor/:username", selectDoctor);

// Add prescription to a patient
router.post("/addPrescription", addPrescription);

// get prescriptions of a patient
router.get("/getprescriptions", getPrescriptions);

// filter prescriptions
router.get("/filterPrescription", filterPrescription)

// select a prescription from filter prescriptions
router.get("/selectPrescription/:prescriptionId", selectPrescription);

router.post("/uploadHealthRecord", uploadHealthRecord);

router.delete("/removeHealthRecord/:recordId", removeHealthRecord);

router.get("/viewHealthRecords", viewHealthRecords);

router.get("/getAppointments", getAppointments);

router.get("/filterAppointmentsDateStatus", filterAppointmentsDateStatus);

router.get("/getWallet", getWallet);

router.post('/linkFamily',linkFamily);

router.post("/payment-appointment", payAppointment);

router.get("/payment-appointment", payAppointment2);

router.post("/payment-package", payPackage);

router.get("/payment-package", payPackage2);




// router.post("/reserveappointment",reserveappointment)

// router.patch("/addPackageToFamilyMember/", addPackageToFamilyMember);

// //add doctor to patient
// router.patch("/adddoctor/", adddoctor);




// //2
// router.get("/download/:recordId", downloadHealthRecordFile);

export default router;
