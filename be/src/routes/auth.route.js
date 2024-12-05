import express from "express";
import { login, logout, register, verifyEmail, forgotPassword, resetPassword, checkAuth } from "../controller/auth.controller.js";
import { verifyAuth } from "../middleware/verifyAuth.js";

const router = express.Router();

router.get("/check-auth", verifyAuth, checkAuth);
router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router;