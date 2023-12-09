import express, { json } from "express";
import { createPatient, updatePatient, deletePatient, setFamilyMember, getFamilyMembers, 
         getDoctorsNameSpecialitySessionPrice, getDoctorNameSpeciality, filterDoctorsSpecialityAvailability, 
         selectDoctor, getPrescriptions, addPrescription, filterPrescription, selectPrescription,
         addhealthrecord, downloadHealthRecordFile, removeHealthRecord, viewHealthRecords, viewAllPatients,
         viewAllDoctors} from "../controllers/patientController.js";
import upload from "../Middleware/multer.js";

//router initialization
const router = express.Router();

// //post request
router.post("/", createPatient);

//put request
router.put("/", updatePatient);

//delete request
router.delete("/", deletePatient);

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

// // get request
// router.get("/", fetchPatient);

// router.post("/reserveappointment",reserveappointment)

// router.patch("/addPackageToFamilyMember/", addPackageToFamilyMember);

// //add doctor to patient
// router.patch("/adddoctor/", adddoctor);



// router.get("/getappointments/:username", getappointments);

// //2
router.post("/addhealthrecord", upload.single("file"), addhealthrecord);
router.get("/download/:recordId", downloadHealthRecordFile);
router.delete("/removehealthrecord/:recordId", removeHealthRecord);
router.get("/viewhealthrecords", viewHealthRecords);
router.get("/viewallpatients", viewAllPatients);
router.get("/viewalldoctors", viewAllDoctors);

// router.post("/payment-appointment", payAppointment);
// router.get("/payment-appointment", payAppointment2);
// router.post("/payment-package", payPackage);
// router.get("/payment-package", payPackage2);

// router.get("/wallet", getWallet);
// router.post('/link',linkFamily);

export default router;
