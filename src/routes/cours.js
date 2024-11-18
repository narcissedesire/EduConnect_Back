import { Router } from "express";
import {
  clientCours,
  createCours,
  datailCours,
  deleteCours,
  updateCours,
} from "../controllers/cours.js";
import { authMiddleware } from "../middleware/middleware.js";
import { enseignantMiddleware } from "../middleware/enseignantMiddleware.js";

export const coursRoute = Router();

coursRoute.get("/", clientCours);
coursRoute.get("/detail/:id", datailCours);
coursRoute.post("/create", createCours);
coursRoute.put(
  "/update/:id",
  [authMiddleware, enseignantMiddleware],
  updateCours
);
coursRoute.delete(
  "/delete/:id",
  [authMiddleware, enseignantMiddleware],
  deleteCours
);
