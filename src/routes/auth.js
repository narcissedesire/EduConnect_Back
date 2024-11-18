import { Router } from "express";
import { Profile, login, logout, register } from "../controllers/auth.js";
import { authMiddleware } from "../middleware/middleware.js";
import { enseignantMiddleware } from "../middleware/enseignantMiddleware.js";

export const authRoutes = Router();

authRoutes.post("/login", login);
authRoutes.post("/register", register);
authRoutes.get("/profil", [authMiddleware, enseignantMiddleware], Profile);
authRoutes.get("/logout", [authMiddleware], logout);
