import { prismaClient } from "../../prisma/prismaClient.js";
import { validateData } from "../utils/fonctionValidation.js";
import { dataModule } from "../utils/validation.js";
import { createFichiers, updateFichiers } from "./fichierPDF.js";
import { createVideos, updateVideos } from "./video.js";

export const readModule = async (req, res) => {
  try {
    const modules = await prismaClient.module.findMany();
    res.json({
      modules,
      message: "Liste des modules récupérées",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const readModuleCours = async (req, res) => {
  try {
    const { id_cours } = req.params;
    const modules = await prismaClient.module.findMany({
      where: { id_cours },
    });
    res.json({
      modules,
      message: "Liste des modules récupérées",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createModule = (modules) => {
  try {
    return modules.map((module) => ({
      nom: module.nom,
      description: module.description,
      dure: module.dure,
      videos: {
        create: createVideos(module.videos),
      },
      fichiers: {
        create: createFichiers(module.fichiers),
      },
    }));
  } catch (error) {
    throw new Error(error);
  }
};

export const updateModule = async (prismaClient, modules, coursId) => {
  for (const module of modules) {
    if (module.id) {
      // Mettre à jour le module existant
      await prismaClient.module.update({
        where: { id: module.id },
        data: {
          nom: module.nom,
          description: module.description,
          dure: module.dure,
        },
      });

      // Mettre à jour les vidéos et les fichiers associés
      await updateVideos(prismaClient, module.videos, module.id);
      await updateFichiers(prismaClient, module.fichiers, module.id);
    } else {
      // Créer un nouveau module
      const newModule = await prismaClient.module.create({
        data: {
          nom: module.nom,
          description: module.description,
          dure: module.dure,
          coursId: coursId,
          videos: {
            create: module.videos,
          },
          fichiers: {
            create: module.fichiers,
          },
        },
      });
    }
  }
};

export const deleteModule = async (req, res) => {
  try {
    const { id } = req.params;
    await prismaClient.module.delete({
      where: { id },
    });
    res.status(204).json({ message: "Module supprimé", status: "success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
