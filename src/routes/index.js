import { Router } from "express";
import { authRoutes } from "./auth.js";
import { categorieRoutes } from "./categorie.js";
import { moduleRoutes } from "./module.js";
import { coursRoute } from "./cours.js";
import { routeCommentaire } from "./commentaire.js";
import { routeReponseComment } from "./reponseComment.js";

export const rootRouter = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/categorie", categorieRoutes);
rootRouter.use("/module", moduleRoutes);
rootRouter.use("/cours", coursRoute);
rootRouter.use("/commentaire", routeCommentaire);
rootRouter.use("/reponseComment", routeReponseComment);
