import path from "path";
import fs from "fs";
import multer from "multer";
import { prismaClient } from "../../prisma/prismaClient.js";

const uploadPath = path.resolve("public", "videos");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const uploadVideo = multer({ storage });

export const createVideos = async (req, res) => {
  console.log(req.body);
  console.log(req.file.filename);

  if (!req.file) {
    return res.status(400).json({ message: "Aucun fichier téléchargé." });
  }

  const { nom, description, id_module } = req.body;
  const filename = req.file.filename;

  try {
    const fichier = await prismaClient.video.create({
      data: {
        nom,
        description,
        liens: filename,
        id_module,
      },
    });
    res.status(201).json({
      status: "success",
      data: fichier,
      message: "Creation avec succée",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateVideos = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, description } = req.body;
    const updatedVideo = await prismaClient.video.update({
      where: { id },
      data: {
        nom,
        description,
      },
    });
    res.status(200).json({ status: "success", data: updatedVideo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    await prismaClient.video.delete({
      where: { id },
    });
    res.status(204).json({ message: "Video supprimée", status: "success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
