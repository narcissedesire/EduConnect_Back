import { Router } from "express";
import { authRoutes } from "./auth.js";
import { categorieRoutes } from "./categorie.js";
import { moduleRoutes } from "./module.js";
import { coursRoute } from "./cours.js";
import { routeCommentaire } from "./commentaire.js";
import { routeReponseComment } from "./reponseComment.js";
import { routeMessage } from "./message.js";
import { routeConversation } from "./conversation.js";
import { routeFichier } from "./videoFichier.js";
import { routeEtudiant } from "./etudiant.js";

export const rootRouter = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/categorie", categorieRoutes);
rootRouter.use("/module", moduleRoutes);
rootRouter.use("/cours", coursRoute);
rootRouter.use("/commentaire", routeCommentaire);
rootRouter.use("/reponseComment", routeReponseComment);
rootRouter.use("/message", routeMessage);
rootRouter.use("/conversation", routeConversation);
rootRouter.use("/videoFichier", routeFichier);
rootRouter.use("/etudiant", routeEtudiant);
