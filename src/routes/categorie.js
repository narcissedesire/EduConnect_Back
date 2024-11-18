import { Router } from "express";
import {
  createCategorie,
  deleteCategorie,
  readCategorie,
  updateCategorie,
} from "../controllers/categorie.js";
import { authMiddleware } from "../middleware/middleware.js";

export const categorieRoutes = Router();

categorieRoutes.get("/", readCategorie);
categorieRoutes.post("/create", [authMiddleware], createCategorie);
categorieRoutes.put("/update/:id", [authMiddleware], updateCategorie);
categorieRoutes.put("/delete/:id", [authMiddleware], deleteCategorie);
