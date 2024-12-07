import { prismaClient } from "../../prisma/prismaClient.js";

export const readMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const conversation = await prismaClient.conversation.findUnique({
      where: { id },
    });
    if (!conversation) {
      return res.status(404).json({ error: "Conversation introuvable" });
    }

    const messages = await prismaClient.message.findMany({
      where: { id_conversation: id },
    });
    res.json({
      messages,
      message: "Liste des messages récupérés",
      status: "success",
    });
  } catch (error) {
    console.error("Erreur dans readMessage:", error);
    res.status(500).json({
      error: "Une erreur s'est produite lors de la récupération des messages.",
    });
  }
};

export const createMessage = async (req, res) => {
  const { text, id_sender, id_conversation } = req.body;

  if (!text || !id_sender || !id_conversation) {
    return res.status(400).json({
      error: "Les champs text, id_sender et id_conversation sont requis.",
    });
  }

  try {
    const conversation = await prismaClient.conversation.findUnique({
      where: { id: id_conversation },
    });
    if (!conversation) {
      return res.status(404).json({ error: "Conversation introuvable." });
    }

    const sender = await prismaClient.utilisateur.findUnique({
      where: { id: id_sender },
    });
    if (!sender) {
      return res.status(404).json({ error: "Expéditeur introuvable." });
    }

    const message = await prismaClient.message.create({
      data: {
        text,
        id_sender,
        id_conversation,
      },
    });

    res.json({
      message: "Message créé avec succès.",
      status: "success",
      data: message,
    });
  } catch (error) {
    console.error("Erreur dans createMessage:", error);
    res.status(500).json({
      error: "Une erreur s'est produite lors de la création du message.",
      details: error.message,
    });
  }
};
