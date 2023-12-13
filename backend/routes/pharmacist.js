import express from "express";
import { uploadDocuments } from "../controllers/pharmacistController.js";
//router initialization
const router = express.Router();

// (Req 9) As a pharmacist upload and submit required documents upon registration such as ID, pharmacy degree anf Working licenses   
router.post("/upload-documents", uploadDocuments);

export default router