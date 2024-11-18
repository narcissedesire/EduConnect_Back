import { Router } from "express";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../controllers/reponseComment.js";

export const routeReponseComment = Router();

routeReponseComment.post("/create", createComment);
routeReponseComment.put("/update/:id", updateComment);
routeReponseComment.delete("/delete/:id", deleteComment);
