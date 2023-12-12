import express, { json } from "express";
import { addPackage, updatePackage, deletePackage, getPackages, subscribePackage } from "../controllers/packageController.js";

//router initialization
const router = express.Router();

// (Req 11) add/update/delete health packages with different price ranges depending on the services included in each package ( silver, gold, platinum).
router.post("/addPackage", addPackage);
router.patch("/updatePackage", updatePackage);
router.delete("/deletePackage", deletePackage);

router.get("/", getPackages);

router.post("/subscribe", subscribePackage);

export default router;
