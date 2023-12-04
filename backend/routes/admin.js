import express from "express";
import { createAdmin, deleteAdmin , acceptDoctorRequest, rejectDoctorRequest, getPendingDoctorRequests, acceptDoctorRequestReg} from "../controllers/adminController.js";
// import { login} from "../controllers/utilityController.js";

//router initialization
const router = express.Router();

//router.get('/',);

router.post('/',createAdmin);

router.delete('/',deleteAdmin);

//10
// Get a list of pending doctor registration requests
router.get("/", getPendingDoctorRequests);

// Accept a doctor request
router.post("/accept/:username", acceptDoctorRequest);

// Reject a doctor request
router.post("/reject/:username", rejectDoctorRequest);

//15
// Accept Doctor registration request
router.post("/admin/doctors/requests/accept/:username", acceptDoctorRequestReg);

export default router