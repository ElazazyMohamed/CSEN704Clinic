import express, { json } from "express";
import { addFamilyMember, getFamilyMembers, 
         getDoctorsNameSpecialitySessionPrice, getDoctorNameSpeciality, filterDoctorsSpecialityAvailability, 
         selectDoctor, viewSelectedDoctor, getPrescriptions, filterPrescription, selectPrescription, 
         uploadHealthRecord, viewHealthRecords, removeHealthRecord, linkFamily, getAppointments, 
         filterAppointmentsDateStatus, getWallet, payAppointment, payAppointment2, payPackage, 
         payPackage2 } from "../controllers/patientController.js";

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

// (Req 54) As a patient view a list of all my perscriptions
router.get("/get-prescriptions", getPrescriptions);

// (Req 55) As a patient filter prescriptions based on date or doctor or filled or unfilled
router.get("/filter-prescription", filterPrescription)

// (Req 56) As a patient select a prescription from my list of perscriptions
router.get("/select-prescription/:prescriptionId", selectPrescription);

// (Req 2) As a patient upload documents (PDF,JPEG,JPG,PNG) for my medical history
router.post("/upload-health-record", uploadHealthRecord);

// helper to remove
router.get("/get-health-records", viewHealthRecords);

// (Req 2) As a patient remove documents (PDF,JPEG,JPG,PNG) for my medical history
router.delete("/remove-health-record/:recordId", removeHealthRecord);

// (Req 19) As a patient link another patient's account as a family member using email or phone number stating relation to the patient
router.post('/link-family',linkFamily);

router.get("/getAppointments", getAppointments);

router.get("/filterAppointmentsDateStatus", filterAppointmentsDateStatus);

router.get("/getWallet", getWallet);



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
