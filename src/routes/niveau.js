import { Router } from "express";
import {
  createNiveau,
  deleteNiveau,
  readNiveaux,
  updateNiveau,
} from "../controllers/niveau.js";
import { authMiddleware } from "../middleware/middleware.js";

export const niveauRoutes = Router();

niveauRoutes.get("/", [authMiddleware], readNiveaux);
niveauRoutes.post("/create", [authMiddleware], createNiveau);
niveauRoutes.put("/update/:id", [authMiddleware], updateNiveau);
niveauRoutes.delete("/delete/:id", [authMiddleware], deleteNiveau);
