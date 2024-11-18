import { prismaClient } from "../../prisma/prismaClient.js";
import { validateData } from "../utils/fonctionValidation.js";
import { dataCategorie } from "../utils/validation.js";

export const readCategorie = async (req, res) => {
  try {
    const categorie = await prismaClient.categorie.findMany();
    res.json({
      categorie,
      message: "Liste des catégories récupérées",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCategorie = async (req, res) => {
  try {
    const { label, description } = validateData(req.body, dataCategorie);
    const categorie = await prismaClient.categorie.create({
      data: {
        label,
        description,
      },
    });
    res.json({
      categorie,
      message: "Création de la catégorie réussi",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCategorie = async (req, res) => {
  try {
    const { id } = req.params;
    const { label, description } = validateData(req.body, dataCategorie);
    if (!id) {
      return res.status(400).json({ error: "Le categorie est introuvable!" });
    }
    const categorie = await prismaClient.categorie.update({
      where: { id },
      data: {
        label,
        description,
      },
    });
    res.json({
      categorie,
      message: "Mis a jour de la catégorie réussi",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategorie = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Le categorie est introuvable!" });
    }
    await prismaClient.categorie.delete({ where: { id } });
    res.json({
      message: "Suppression de la catégorie réussi",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
