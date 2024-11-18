import { z } from "zod";

export const dataRegister = z.object({
  nom: z
    .string()
    .min(2, "Le nom doit avoir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),
  prenom: z
    .string()
    .min(2, "Le prénom doit avoir au moins 2 caractères")
    .max(50, "Le prénom ne peut pas dépasser 50 caractères"),
  email: z.string().email("Adresse e-mail invalide"),
  mot_passe: z
    .string()
    .min(8, "Le mot de passe doit comporter au moins 8 caractères")
    .regex(
      /[A-Z]/,
      "Le mot de passe doit contenir au moins une lettre majuscule"
    )
    .regex(
      /[a-z]/,
      "Le mot de passe doit contenir au moins une lettre minuscule"
    )
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
    .regex(
      /[@$!%*?&]/,
      "Le mot de passe doit contenir au moins un caractère spécial (@, $, !, %, *, ?, & par exemple)"
    ),
  role: z.enum(["etudiant", "enseignant", "administrateur"], "Rôle invalide"),
});

export const dataLogin = z.object({
  email: z.string().email("Adresse e-mail invalide"),
  mot_passe: z
    .string()
    .min(6, "Le mot de passe doit comporter au moins 6 caractères"),
});

export const dataCours = z.object({
  titre: z.string().min(2, "Le nom du cours doit avoir au moins 2 caractères"),
  description: z
    .string()
    .min(10, "La description du cours doit avoir au moins 10 caractères"),
  id_categorie: z.string(),
  id_enseignant: z.string(),
  modules: z
    .array(
      z.object({
        nom: z
          .string()
          .min(2, "Le nom du module doit avoir au moins 2 caractères"),
        description: z
          .string()
          .min(10, "La description du module doit avoir au moins 10 caractères")
          .optional(), // Rendre ce champ optionnel si nécessaire
        dure: z.number().min(1, "La durée doit être supérieure à 0"),
        videos: z
          .array(
            z.object({
              nom: z
                .string()
                .min(2, "Le nom de la vidéo doit avoir au moins 2 caractères"),
              contenu: z
                .string()
                .min(
                  5,
                  "Le contenu de la vidéo doit avoir au moins 5 caractères"
                ),
            })
          )
          .optional(),
        fichiers: z
          .array(
            z.object({
              nom: z
                .string()
                .min(2, "Le nom du fichier doit avoir au moins 2 caractères"),
              contenu: z
                .string()
                .min(
                  5,
                  "Le contenu du fichier doit avoir au moins 5 caractères"
                ),
            })
          )
          .optional(),
      })
    )
    .nonempty("Le cours doit contenir au moins un module"),
});

export const dataCategorie = z.object({
  label: z.string().min(2, "Label doit avoir au mois 2 caracteurs"),
  description: z
    .string()
    .min(10, "La description doit avoir au moins 10 caractères"),
});

export const dataNiveau = z.object({
  label: z.string().min(2, "Label doit avoir au mois 2 caracteurs"),
  description: z
    .string()
    .min(10, "La description doit avoir au moins 10 caractères"),
});

export const dataModule = z.object({
  nom: z.string().min(2, "Label doit avoir au moins 2 caractères"),
  description: z
    .string()
    .min(10, "La description doit avoir au moins 10 caractères"),
  id_cours: z.string().min(2, "L'id du cours doit être présent"),
  dure: z.number().int("La durée doit être un entier"),
});
