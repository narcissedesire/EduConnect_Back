import multer from "multer";
import { prismaClient } from "../../prisma/prismaClient.js";
import path from "path";
import fs from "fs";

const uploadPath = path.resolve("public", "ImagesCours");

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

export const uploadPhotoCours = multer({ storage });

export const clientCours = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const skip = (page - 1) * pageSize;

    const filterCondition = {};

    const cours = await prismaClient.cours.findMany({
      where: filterCondition,
      skip: parseInt(skip),
      take: parseInt(pageSize),
      include: {
        modules: true,
        niveau: true,
        categorie: true,
        photo: true,
      },
      // orderBy: {
      //   createdAt: "desc",
      // },
    });

    if (!cours || cours.length === 0) {
      return res.status(404).json({
        message: "Aucun cours trouvé",
        status: "error",
      });
    }

    res.json({
      cours,
      message: "Récupération du cours réussie",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const coursEnseignatId = async (req, res) => {
  try {
    const { id } = req.params;

    const cours = await prismaClient.enseignant.findMany({
      where: { id_utilisateur: id },
      include: {
        cours: {
          include: {
            categorie: true,
            modules: true,
            photo: true,
          },
        },
      },
    });

    if (cours.length > 0 && cours[0].cours.length > 0) {
      cours[0].cours.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    res.json({
      cours,
      message: "Récupération du cours réussie",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const datailCours = async (req, res) => {
  try {
    const { id } = req.params;

    const cours = await prismaClient.cours.findUnique({
      where: { id },
      include: {
        modules: {
          include: {
            videos: {
              include: {
                commentaires: {
                  include: {
                    utilisateur: true,
                    reponses: {
                      include: {
                        utilisateur: {
                          include: {
                            photo: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            fichiers: true,
          },
        },
        niveau: true,
        categorie: true,
        photo: true,
        avis: {
          include: {
            utilisateur: true,
          },
        },
        enseignant: {
          include: {
            utilisateur: true,
          },
        },
        inscriptions: {
          include: {
            etudiant: {
              include: {
                utilisateur: true,
              },
            },
          },
        },
      },
    });

    if (!cours) {
      return res.status(404).json({ error: "Cours non trouvé" });
    }

    res.json({
      cours,
      message: "Récupération du cours réussie",
      status: "success",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const createCours = async (req, res) => {
  try {
    console.log(req.file);
    console.log(req.body);
    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier téléchargé." });
    }
    const { titre, description, categorieId, id_utilisateur } = req.body;
    const photo = req.file.filename;

    if (!id_utilisateur) {
      res.status(404).json({ message: "L'ID de l'utilisateur est requis" });
    }

    const createPhoto = await prismaClient.photo.create({
      data: {
        nom: photo,
      },
    });

    const enseignant = await prismaClient.enseignant.findFirst({
      where: { id_utilisateur },
    });
    if (enseignant) {
      console.log(enseignant.id);
    } else {
      console.log("pas enseignat");
    }

    const cours = await prismaClient.cours.create({
      data: {
        titre,
        description,
        id_enseignant: enseignant.id,
        id_categorie: categorieId,
        id_photo: createPhoto.id,
      },
    });

    res.json({
      cours,
      message:
        "Création du cours et de ses modules, vidéos, et fichiers réussie",
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateCours = async (req, res) => {
  try {
    const { id } = req.params;
    const { titre, description, categorieId } = req.body;
    console.log(req.body);

    if (!id) {
      res.status(404).json({ message: "Identifiant non trouvé" });
    }

    const cours = await prismaClient.cours.update({
      where: { id },
      data: {
        titre,
        description,
        id_categorie: categorieId,
      },
    });

    res.json({
      cours,
      message: "Mise à jour du cours réussie",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCours = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw Error("Identifiant ne pas trouver");
    }
    await prismaClient.cours.delete({ where: { id } });
    res.json({
      message: "Suppression du cours réussi",
      status: "success",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
