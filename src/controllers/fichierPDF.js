import path from "path";
import fs from "fs";
import multer from "multer";
import { prismaClient } from "../../prisma/prismaClient.js";

const uploadPath = path.resolve("public", "fichiers");

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

export const uploadFichier = multer({ storage });

export const createFichier = async (req, res) => {
  console.log(req.body);
  console.log(req.file.filename);

  if (!req.file) {
    return res.status(400).json({ message: "Aucun fichier téléchargé." });
  }

  const { nom, description, id_module } = req.body;
  const filename = req.file.filename;

  try {
    const fichier = await prismaClient.fichier.create({
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

export const deleteFichier = async (req, res) => {
  try {
    const { id } = req.params;
    await prismaClient.fichier.delete({
      where: { id },
    });
    res.status(204).json({ message: "Video supprimée", status: "success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateFichiers = async (prismaClient, fichiers, moduleId) => {
  for (const fichier of fichiers) {
    if (fichier.id) {
      await prismaClient.fichier.update({
        where: { id: fichier.id },
        data: {
          nom: fichier.nom,
          contenu: fichier.contenu,
          description: fichier.description,
        },
      });
    } else {
      throw new Error("Fichier n'est pas trouver");
    }
  }
};
