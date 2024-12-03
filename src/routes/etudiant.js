import { Router } from "express";
import {
  inscrireCours,
  readEudiantEnseignantId,
} from "../controllers/etudiant.js";

export const routeEtudiant = Router();

routeEtudiant.get("/:id", readEudiantEnseignantId);
routeEtudiant.post("/inscrireCours", inscrireCours);
