import { prismaClient } from "../../prisma/prismaClient.js";

export const createEtudiant = async (id) => {
  await prismaClient.etudiant.create({
    data: {
      id_utilisateur: id,
    },
  });
};
