import express from "express";
import { login, logout, forgotPassword, resetPassword} from "../controllers/userController.js";

//router initialization
const router = express.Router();

router.post('/login',login);

router.get('/logout',logout)

router.post('/forgotPassword', forgotPassword);

router.post('/resetPassword', resetPassword);

export default router