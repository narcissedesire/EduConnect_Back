import { prismaClient } from "../../prisma/prismaClient.js";

export const readVideoCours = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await prismaClient.video.findFirst({
      where: { id },
    });
    if (!video) {
      res.status(404).json({ error: "Video introuvable" });
    }
    res.status(200).json({ status: "success", data: video });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createVideos = (videos) => {
  return videos.map((video) => ({
    nom: video.nom,
    contenu: video.contenu,
    description: video.description,
  }));
};

export const updateVideos = async (prismaClient, videos, moduleId) => {
  for (const video of videos) {
    if (video.id) {
      // Mettre à jour la vidéo existante
      await prismaClient.video.update({
        where: { id: video.id },
        data: {
          nom: video.nom,
          contenu: video.contenu,
          description: video.description,
        },
      });
    } else {
      throw new Error("Fichier n'est pas trouver");
    }
  }
};
