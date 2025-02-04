import { prismaClient } from "../../prisma/prismaClient.js";

export const createEtudiant = async (id) => {
  await prismaClient.etudiant.create({
    data: {
      id_utilisateur: id,
    },
  });
};

export const readEudiantEnseignantId = async (req, res) => {
  const { id } = req.params;

  try {
    const enseignant = await prismaClient.enseignant.findFirst({
      where: { id_utilisateur: id },
    });
    const etudiants = await prismaClient.etudiant.findMany({
      // where: {
      //   inscriptions: {
      //     some: {
      //       cours: {
      //         id_enseignant: enseignant.id, // Filtrer par l'ID de l'enseignant
      //       },
      //     },
      //   },
      // },
      // include: {
      // inscriptions: {
      where: {
        inscriptions: {
          some: {
            cours: {
              id_enseignant: enseignant.id, // Filtrer par l'ID de l'enseignant
            },
          },
          include: {
            cours: true, // Inclure les détails des cours
            etudiant: {
              include: {
                utilisateur: true,
              },
            },
          },
        },
      },

      // },
      // },
    });
    console.log(etudiants);

    res.status(200).json({
      status: "success",
      data: etudiants,
      message: "Liste des etudiant inscrit",
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const inscrireCours = async (req, res) => {
  const { id_user, id_cours } = req.body;

  if (!id_user || !id_cours) {
    return res
      .status(400)
      .json({ message: "ID utilisateur et ID cours requis." });
  }

  try {
    const etudiant = await prismaClient.etudiant.findUnique({
      where: { id_utilisateur: id_user },
    });

    const findInscrire = await prismaClient.inscrire.findFirst({
      where: {
        id_etudiant: etudiant.id,
        id_cours,
      },
    });

    if (findInscrire) {
      return res
        .status(200)
        .json({ message: "L'étudiant est déjà inscrit.", status: "success" });
    }

    const inscrire = await prismaClient.inscrire.create({
      data: {
        id_etudiant: etudiant.id,
        id_cours,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Inscription réussie.",
      data: inscrire,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
