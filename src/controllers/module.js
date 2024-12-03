import { prismaClient } from "../../prisma/prismaClient.js";

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
    const { id } = req.params;
    const modules = await prismaClient.module.findMany({
      where: { id_cours: id },
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

export const readDetailModule = async (req, res) => {
  try {
    const { id } = req.params;
    const module = await prismaClient.module.findFirst({
      where: { id },
      include: {
        videos: true,
        fichiers: true,
      },
    });
    res.json({
      module,
      message: "Module récupéré",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createModule = async (req, res) => {
  const { nom, description, id_cours } = req.body;
  try {
    const module = await prismaClient.module.create({
      data: {
        nom,
        description,
        id_cours,
      },
    });
    res.json({
      module,
      message: "Module créé",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateModule = async (req, res) => {
  const { nom, description } = req.body;
  const { id } = req.params;
  try {
    const module = await prismaClient.module.update({
      where: { id },
      data: {
        nom,
        description,
      },
    });
    res.json({
      module,
      message: "Module modifié",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
