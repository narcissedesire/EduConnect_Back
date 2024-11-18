import { prismaClient } from "../../prisma/prismaClient.js";

export const createSession = async (token, id_utilisateur) => {
  try {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 12);

    await prismaClient.session.create({
      data: {
        token,
        isValide: true,
        id_utilisateur,
        expiresAt,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateSession = async (token) => {
  try {
    await prismaClient.session.updateMany({
      where: { token, isValide: true },
      data: {
        isValide: false,
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const sessionToken = async () => {
  try {
    const sessions = await prismaClient.session.findMany({
      where: { isValide: true },
    });
    return sessions;
  } catch (error) {
    console.log(error);
  }
};
