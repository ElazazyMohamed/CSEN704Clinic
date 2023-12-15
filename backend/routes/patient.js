import express, { json } from "express";
import { addFamilyMember, getFamilyMembers, 
         getDoctorsNameSpecialitySessionPrice, getDoctorNameSpeciality, filterDoctorsSpecialityAvailability, 
         selectDoctor, viewSelectedDoctor, getPrescriptions, addPrescription, filterPrescription, selectPrescription,
         uploadHealthRecord, removeHealthRecord, viewHealthRecords, getAppointments, 
         filterAppointmentsDateStatus, getWallet, linkFamily, payAppointment, payAppointment2, payPackage
         , payPackage2 } from "../controllers/patientController.js";
import upload from "../Middleware/multer.js";

//router initialization
const router = express.Router();

// (Req 18) As a patient add family members using name, National ID, age, gender and relation to the patient 
router.patch("/add-family-fember", addFamilyMember);

// (Req 22) As a patient view registered family members
router.get("/get-family-members", getFamilyMembers);

// (Req 37) As a patient view a list of all doctors along with their speciality, session price (based on subscribed health package if any)
router.get("/get-doctors-name-speciality-sessionPrice", getDoctorsNameSpecialitySessionPrice);

// (Req 38) As a patient search for a doctor by name and/or speciality
router.get("/get-doctor-name-and-or-speciality", getDoctorNameSpeciality);

// filter doctors speciality and or or availability on certain date and at specific time
router.get("/filter-doctors-speciality-availability", filterDoctorsSpecialityAvailability);

// (Req 40) As a patient select a doctor from the search/filter results, 
router.get("/select-doctor/:username", selectDoctor);

// (Req 41) As a patient view all details of selected doctor including specilaty, affiliation (hospital), educational background
router.post("/view-selected-doctor", viewSelectedDoctor); // view is called inside select 

// get prescriptions of a patient
router.get("/get-prescriptions", getPrescriptions);

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
