import { prismaClient } from "../../prisma/prismaClient";
import { validateData } from "../utils/fonctionValidation";
import { dataNiveau } from "../utils/validation";

export const readNiveaux = async (req, res) => {
  try {
    const niveaux = await prismaClient.niveau.findMany();
    res.json({
      niveaux,
      message: "Liste des niveaux récupérés",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createNiveau = async (req, res) => {
  try {
    const { label, description } = validateData(req.body, dataNiveau);

    const niveau = await prismaClient.niveau.create({
      data: {
        label,
        description,
      },
    });
    res.json({
      message: "Niveau créé avec succès",
      status: "success",
      niveau,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateNiveau = async (req, res) => {
  try {
    const { id } = req.params;
    const { label, description } = validateData(req.body, dataNiveau);
    if (!id) {
      res.status(404).json({ error: "Le niveau est introuvable" });
    }

    const niveau = await prismaClient.niveau.update({
      where: { id },
      data: {
        label,
        description,
      },
    });
    res.json({
      message: "Niveau mis à jour avec succès",
      status: "success",
      niveau,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteNiveau = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(404).json({ error: "Le niveau est introuvable" });
    }

    await prismaClient.niveau.delete({
      where: { id },
    });
    res.json({
      message: "Niveau supprimé avec succès",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
