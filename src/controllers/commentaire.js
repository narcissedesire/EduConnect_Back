import { prismaClient } from "../../prisma/prismaClient.js";

export const createCommentaire = async (req, res) => {
  try {
    const { text, id_utilisateur, id_video } = req.body;
    const commentaire = await prismaClient.commentaire.create({
      data: {
        text,
        id_video,
        id_utilisateur,
      },
    });
    res.json({
      commentaire,
      message: "Création du commentaire reussi",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCommentaire = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(404).json({ error: "Le commentaire est introuvable" });
    }
    const { text } = req.body;
    const commentaire = await prismaClient.commentaire.update({
      where: { id },
      data: {
        text,
      },
    });
    res.json({
      commentaire,
      message: "Création du commentaire reussi",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCommentaire = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(404).json({ error: "Le commentaire est introuvable" });
    }
    await prismaClient.commentaire.delete({ where: { id } });
    res.json({
      message: "Commentaire supprimé avec succès",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
