import { prismaClient } from "../../prisma/prismaClient.js";
import { validateData } from "../utils/fonctionValidation.js";
import {
  createFilterCondition,
  createPaginationResponse,
  getCoursWithPagination,
  getPaginationParams,
} from "../utils/fonction_pagination_filter_cours.js";
import { dataCours } from "../utils/validation.js";
import { readEnseignat } from "./enseignant.js";
import { createModule, updateModule } from "./module.js";

export const clientCours = async (req, res) => {
  try {
    // 1. Récupérer les paramètres
    const { currentPage, pageSize, skip, titre } = getPaginationParams(
      req.query
    );

    // 2. Créer la condition de filtre
    const filterCondition = createFilterCondition(titre);

    // 3. Récupérer les cours avec pagination et filtre
    const { cours, totalCours } = await getCoursWithPagination(
      filterCondition,
      skip,
      pageSize
    );

    // 4. Créer la réponse de pagination
    const response = createPaginationResponse(
      cours,
      totalCours,
      currentPage,
      pageSize
    );

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const datailCours = async (req, res) => {
  try {
    const { id } = req.params;

    // Récupération du cours avec les relations imbriquées
    const cours = await prismaClient.cours.findUnique({
      where: { id },
      include: {
        modules: {
          include: {
            videos: {
              include: {
                commentaires: {
                  include: {
                    utilisateur: true, // Utilisateur ayant posté le commentaire
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
            fichiers: true, // Fichiers liés au module
          },
        },
        niveau: true, // Niveau du cours
        categorie: true, // Catégorie du cours
        avis: {
          include: {
            utilisateur: true, // Utilisateur ayant donné l'avis
          },
        },
        enseignant: {
          include: {
            utilisateur: true, // Détails de l'enseignant
          },
        },
        inscriptions: {
          include: {
            etudiant: {
              include: {
                utilisateur: true, // Détails de l'utilisateur étudiant
              },
            },
          },
        },
      },
    });

    // Vérification si le cours existe
    if (!cours) {
      return res.status(404).json({ error: "Cours non trouvé" });
    }

    // Retour du cours et de ses relations
    res.json({
      cours,
      message: "Récupération du cours réussie",
      status: "success",
    });
  } catch (error) {
    console.error(error); // Journalisation des erreurs
    res.status(500).json({ error: error.message });
  }
};

export const createCours = async (req, res) => {
  try {
    console.log("Requête reçue : ", req.body);
    const { titre, description, id_categorie, id_enseignant, modules } =
      req.body;

    console.log("description : ", description);

    // Vérifiez que l'ID de l'enseignant et de la catégorie sont bien définis
    if (!id_enseignant || !id_categorie) {
      throw new Error("L'ID de l'enseignant et de la catégorie sont requis");
    }

    // Créez le cours avec les modules associés, l'enseignant et la catégorie
    const cours = await prismaClient.cours.create({
      data: {
        titre,
        description,
        enseignant: {
          connect: { id: id_enseignant },
        },
        categorie: {
          connect: { id: id_categorie },
        },
        modules: {
          create: createModule(modules),
        },
      },
    });

    // Réponse en cas de succès
    res.json({
      cours,
      message:
        "Création du cours et de ses modules, vidéos, et fichiers réussie",
      status: "success",
    });
  } catch (error) {
    // Gestion des erreurs
    res.status(500).json({ error: error.message });
  }
};

export const updateCours = async (req, res) => {
  try {
    const { id } = req.params;
    const { titre, description, id_enseignant, id_categorie, modules } =
      validateData(req.body, dataCours);

    if (!id) {
      throw Error("Identifiant non trouvé");
    }

    const cours = await prismaClient.cours.update({
      where: { id },
      data: {
        titre,
        description,
        enseignant: {
          connect: { id: id_enseignant },
        },
        categorie: {
          connect: { id: id_categorie },
        },
        modules: {
          create: createModule(modules),
        },
      },
    });

    // Mettre à jour les modules, vidéos et fichiers
    await updateModule(prismaClient, modules, id);

    res.json({
      cours,
      message: "Mise à jour du cours réussie",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
