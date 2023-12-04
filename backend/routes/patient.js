import express, { json } from "express";
import { 
  getFamilyMembers, 
  addFamilyMember, 
  getappointments, 
  createPatient, 
  deletePatient,
  fetchPatient,
  updatePatient,
  viewDoctorsWithSessionPrice,
  searchDoctor,
  filterDoctors,
  selectDoctor,
  adddoctor,
  getPrescriptions,
  addPrescription,
  addhealthrecord,
  downloadHealthRecordFile,
  removeHealthRecord,
  viewHealthRecords,
  viewAllPatients,
  viewAllDoctors,
  addPackageToFamilyMember,
  reserveappointment,
  payAppointment,
  payPackage,
  getWallet, linkFamily, payAppointment2, payPackage2
} from "../controllers/patientController.js";
import upload from "../Middleware/multer.js";

//router initialization
const router = express.Router();

//get request
router.get("/", fetchPatient);

router.post("/reserveappointment",reserveappointment)

//post request
router.post("/", createPatient);

//delete request
router.delete("/", deletePatient);

//put request
router.put("/", updatePatient);

//add family members
router.patch("/addfamily/", addFamilyMember);

router.patch("/addPackageToFamilyMember/", addPackageToFamilyMember);
//get family members
router.get("/getfamily/:username", getFamilyMembers);

//add doctor to patient
router.patch("/adddoctor/", adddoctor);

// prescriptions to patient
router.get("/getprescription/", getPrescriptions);
router.post("/addprescription/", addPrescription);

router.get("/getappointments/:username", getappointments);

//37
router.get("/doctors/session-price", viewDoctorsWithSessionPrice);

//38
router.get("/searchDoc", searchDoctor);

//39
router.get("/filter", filterDoctors);

//40
router.get("/select/:username", selectDoctor);

//2
router.post("/addhealthrecord", upload.single("file"), addhealthrecord);
router.get("/download/:recordId", downloadHealthRecordFile);
router.delete("/removehealthrecord/:recordId", removeHealthRecord);
router.get("/viewhealthrecords", viewHealthRecords);
router.get("/viewallpatients", viewAllPatients);
router.get("/viewalldoctors", viewAllDoctors);

router.post("/payment-appointment", payAppointment);
router.get("/payment-appointment", payAppointment2);
router.post("/payment-package", payPackage);
router.get("/payment-package", payPackage2);

router.get("/wallet", getWallet);
router.post('/link',linkFamily);

export default router;
