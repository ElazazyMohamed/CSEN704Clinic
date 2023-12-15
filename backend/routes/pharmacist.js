import express from "express";
import { uploadDocuments, addMedicine } from "../controllers/pharmacistController.js";
//router initialization
const router = express.Router();

// (Req 9) As a pharmacist upload and submit required documents upon registration such as ID, pharmacy degree anf Working licenses   
router.post("/upload-documents", uploadDocuments);

// (Req 16) As a pharmacist add a medicine with its details (active ingredients) , price and available quantity
router.post("/add-medicine", addMedicine);

export default router