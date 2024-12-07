import { Router } from "express";
import { createVideos, deleteVideo } from "../controllers/video.js";
import { createFichier, deleteFichier } from "../controllers/fichierPDF.js";

export const routeFichier = Router();

routeFichier.delete("/deleteVideo/:id", deleteVideo);
routeFichier.delete("/deleteFichier/:id", deleteFichier);
