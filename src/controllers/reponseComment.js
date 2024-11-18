import { prismaClient } from "../../prisma/prismaClient.js";

export const createComment = async (req, res) => {
  try {
    const { text, id_utilisateur, id_comment } = req.body;
    console.log(req.body);
    const commentaire = await prismaClient.reponseComment.create({
      data: {
        text,
        id_comment,
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

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(404).json({ error: "Le commentaire est introuvable" });
    }
    const { text } = req.body;
    const commentaire = await prismaClient.reponseComment.update({
      where: { id },
      data: { text },
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

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    if (!id) {
      res.status(404).json({ error: "Le commentaire est introuvable" });
    }
    await prismaClient.reponseComment.delete({ where: { id: id } });
    res.json({
      message: "Commentaire supprimé avec succès",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
