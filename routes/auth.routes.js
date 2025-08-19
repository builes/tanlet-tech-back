import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";

const router = Router();

// Ruta para registro
router.post("/register", registerUser);

router.post("/login", loginUser);

export default router;
import express from "express";
