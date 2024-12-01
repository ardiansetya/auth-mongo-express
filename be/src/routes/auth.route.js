import express from "express";
import { login, logout, register, verifyEmail } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

router.post('/verify-email', verifyEmail);

export default router;