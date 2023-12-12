import express from "express";
import { addAdmin, removeUser, getRegisteredDoctorRequests, getPendDoctorRequests, acceptRegisteredDoctor, 
         acceptPendDoctor, rejectPendDoctor} from "../controllers/adminController.js";

//router initialization
const router = express.Router();

// (Req 7) As a adminstrator add another adminstrator with a set username and password
router.post('/addAdmin',addAdmin);

// (Req 8) As a adminstrator remove a doctor/ patient / Admin from the system
router.delete('/removeUser', removeUser);

// (Req 9) view all of the information uploaded by a doctor to apply to join the platform
router.get("/getRegisteredDoctorRequests", getRegisteredDoctorRequests);
router.get("/getPendDoctorRequests", getPendDoctorRequests);

// (Req 15) accept a request for the registration of a doctor
router.patch("/getRegisteredDoctorRequests/accept/:username", acceptRegisteredDoctor);

// (Req 10) accept or reject the request of a doctor to join the platform
router.patch("/getPendDoctorRequests/accept/:username", acceptPendDoctor);
router.patch("/getPendDoctorRequests/reject/:username", rejectPendDoctor);


export default router;