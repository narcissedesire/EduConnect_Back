import jwt from "jsonwebtoken";
import { prismaClient } from "../../prisma/prismaClient.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res
        .status(403)
        .json({ error: "Accès interdit! Jeton manquant ou malformé" });
    }

    const resToken = jwt.verify(token, process.env.JWT_SECRET);

    // Recherchez la session dans la base de données
    const session = await prismaClient.session.findFirst({
      where: {
        token,
        isValide: true,
      },
    });

    if (!session) {
      return res
        .status(403)
        .json({ error: "Accès interdit! Session invalide ou expirée" });
    }

    // Vérifiez si la session a expiré
    if (new Date() > session.expiresAt) {
      // Mettre à jour la session pour qu'elle ne soit plus valide
      await prismaClient.session.update({
        where: { id: session.id },
        data: { isValide: false },
      });
      return res.status(403).json({ error: "Accès interdit! Session expirée" });
    }

    // Recherchez l'utilisateur en utilisant l'ID du token décodé
    const user = await prismaClient.utilisateur.findFirst({
      where: { id: resToken.id },
    });

    if (!user) {
      return res
        .status(403)
        .json({ error: "Accès interdit! Utilisateur introuvable" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
