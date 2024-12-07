import { prismaClient } from "../../prisma/prismaClient.js";

export const readConversation = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "L'ID de l'utilisateur est requis." });
  }

  try {
    const utilisateur = await prismaClient.utilisateur.findUnique({
      where: { id },
      include: {
        conversationsSent: {
          include: {
            receiver: true,
            messages: {
              orderBy: { createdAt: "asc" },
            },
          },
        },
        conversationsReceived: {
          include: {
            sender: true,
            messages: {
              orderBy: { createdAt: "asc" },
            },
          },
        },
      },
    });

    if (!utilisateur) {
      return res.status(404).json({ error: "Utilisateur introuvable." });
    }

    const conversations = [
      ...utilisateur.conversationsSent.map((conv) => ({
        id: conv.id,
        withUser: {
          id: conv.receiver.id,
          nom: conv.receiver.nom,
          prenom: conv.receiver.prenom,
          email: conv.receiver.email,
          role: conv.receiver.role,
          createdAt: conv.receiver.createdAt,
        },
        messages: conv.messages,
      })),
      ...utilisateur.conversationsReceived.map((conv) => ({
        id: conv.id,
        withUser: {
          id: conv.sender.id,
          nom: conv.sender.nom,
          prenom: conv.sender.prenom,
          email: conv.sender.email,
          role: conv.sender.role,
          createdAt: conv.sender.createdAt,
        },
        messages: conv.messages,
      })),
    ];

    res.json({
      utilisateur: {
        id: utilisateur.id,
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
      },
      conversations,
      message: "Liste des conversations récupérées avec succès.",
      status: "success",
    });
  } catch (error) {
    console.error("Erreur dans readConversation:", error);
    res.status(500).json({
      error:
        "Une erreur s'est produite lors de la récupération des conversations.",
    });
  }
};

export const createConversation = async (req, res) => {
  const { id_sender, id_receiver } = req.body;

  if (id_sender === id_receiver) {
    return res.status(400).json({
      error: "L'expéditeur et le destinataire doivent être différents.",
    });
  }

  try {
    const senderExists = await prismaClient.utilisateur.findUnique({
      where: { id: id_sender },
    });
    const receiverExists = await prismaClient.utilisateur.findUnique({
      where: { id: id_receiver },
    });

    if (!senderExists || !receiverExists) {
      return res
        .status(404)
        .json({ error: "Expéditeur ou destinataire introuvable." });
    }

    const existingConversation = await prismaClient.conversation.findFirst({
      where: {
        OR: [
          { id_sender, id_receiver },
          { id_sender: id_receiver, id_receiver: id_sender },
        ],
      },
    });

    if (existingConversation) {
      return res.status(200).json({
        conversation: existingConversation,
        message: "Une conversation existe déjà entre ces deux utilisateurs.",
        status: "success",
      });
    }

    const conversation = await prismaClient.conversation.create({
      data: {
        id_sender,
        id_receiver,
      },
    });

    res.json({
      conversation,
      message: "Conversation créée avec succès.",
      status: "success",
    });
  } catch (error) {
    console.error("Erreur dans createConversation:", error);
    res.status(500).json({
      error:
        "Une erreur s'est produite lors de la création de la conversation.",
      error,
    });
  }
};

export const getUsersWithStatusAndConversation = async (req, res) => {
  try {
    const { userId } = req.params;

    const users = await prismaClient.utilisateur.findMany({
      where: {
        id: { not: userId },
      },
      select: {
        id: true,
        nom: true,
        prenom: true,
        id_photo: true,
        sessions: {
          orderBy: { createdAt: "desc" },
          take: 1,
          select: { isValide: true, expiresAt: true },
        },
        conversationsSent: {
          where: { id_receiver: userId },
          select: { id: true },
        },
        conversationsReceived: {
          where: { id_sender: userId },
          select: { id: true },
        },
      },
    });

    const transformedUsers = users.map((user) => {
      const lastSession = user.sessions[0];
      const isOnline =
        lastSession &&
        lastSession.isValide &&
        (!lastSession.expiresAt ||
          new Date() < new Date(lastSession.expiresAt));

      const hasConversation =
        user.conversationsSent.length > 0 ||
        user.conversationsReceived.length > 0;

      return {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        id_photo: user.id_photo,
        isOnline,
        hasConversation,
      };
    });

    res.status(200).json(transformedUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Une erreur s'est produite lors de la récupération des utilisateurs.",
      details: error.message,
    });
  }
};
