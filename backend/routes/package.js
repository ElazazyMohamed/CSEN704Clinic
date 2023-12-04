import express, { json } from "express";
import {
  getPackage,
  createPackage,
  updatePackage,
  deletePackage,
  subscribePackage,
} from "../controllers/packageController.js";

const router = express.Router();
router.get("/", getPackage);
router.post("/", createPackage);
router.patch("/", updatePackage);
router.delete("/", deletePackage);
router.post("/subscribe", subscribePackage);
// .get(getPackage);
export default router;
