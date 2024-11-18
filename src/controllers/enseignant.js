import { prismaClient } from "../../prisma/prismaClient.js";

export const createEnseignant = async (id) => {
  await prismaClient.enseignant.create({
    data: {
      id_utilisateur: id,
    },
  });
};

export const readEnseignat = async () => {
  try {
    const { id, role } = req.user;
    const enseignant = await prismaClient.enseignant.findFirst({
      where: { id_utilisateur: id },
    });
    return enseignant;
  } catch (error) {
    console.log(error);
  }
};
