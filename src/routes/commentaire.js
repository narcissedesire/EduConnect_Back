import { Router } from "express";
import {
  createCommentaire,
  deleteCommentaire,
  updateCommentaire,
} from "../controllers/commentaire.js";

export const routeCommentaire = Router();

routeCommentaire.post("/create", createCommentaire);
routeCommentaire.put("/update/:id", updateCommentaire);
routeCommentaire.delete("/delete/:id", deleteCommentaire);
