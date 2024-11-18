import { Router } from "express";
import {
  createModule,
  deleteModule,
  readModule,
  readModuleCours,
  updateModule,
} from "../controllers/module.js";
import { authMiddleware } from "../middleware/middleware.js";
import { enseignantMiddleware } from "../middleware/enseignantMiddleware.js";

export const moduleRoutes = Router();

moduleRoutes.get("/", readModule);
moduleRoutes.get("/cours", readModuleCours);
moduleRoutes.post(
  "/create",
  [authMiddleware, enseignantMiddleware],
  createModule
);
moduleRoutes.put(
  "/update/:id",
  [authMiddleware, enseignantMiddleware],
  updateModule
);
moduleRoutes.delete(
  "/delete/:id",
  [authMiddleware, enseignantMiddleware],
  deleteModule
);
