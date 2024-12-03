import express from "express";
import { login, logout, register, verifyEmail, forgotPassword } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);

export default router;