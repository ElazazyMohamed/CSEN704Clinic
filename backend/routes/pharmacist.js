import express from "express";
import { uploadDocuments, addMedicine, viewQuantitySalesMedicine, editMedicineDetailsPrice, archiveMedicine, 
         unArchiveMedicine } from "../controllers/pharmacistController.js";
//router initialization
const router = express.Router();

// (Req 9) As a pharmacist upload and submit required documents upon registration such as ID, pharmacy degree anf Working licenses   
router.post("/upload-documents", uploadDocuments);

// (Req 16) As a pharmacist add a medicine with its details (active ingredients) , price and available quantity
// (Req 17) As a pharmacist upload medicine image
router.post("/add-medicine", addMedicine);

// (Req 13) As a Pharmacist view the available quantity, and sales of each medicine
router.get("/view-medicine-sales-quantity", viewQuantitySalesMedicine);

// (Req 18) As a pharmacist edit medicine details and price
router.post("/edit-medicine-details-price", editMedicineDetailsPrice);

// (Req 19) as a pharmacist archive a medicine
router.post("/archive-medicine", archiveMedicine);

// (Req 19) as a pharmacist unarchive a medicine
router.post("/unarchive-medicine", unArchiveMedicine);

export default router