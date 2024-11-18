import { prismaClient } from "../../prisma/prismaClient.js";

export const getPaginationParams = (query) => {
  const { page = 1, taille = 10, titre = "" } = query;
  const currentPage = parseInt(page);
  const pageSize = parseInt(taille);
  const skip = (currentPage - 1) * pageSize;

  return { currentPage, pageSize, skip, titre };
};

export const createFilterCondition = (titre) => {
  if (titre) {
    return { titre: { contains: titre, mode: "insensitive" } };
  }
  return {};
};

export const getCoursWithPagination = async (
  filterCondition,
  skip,
  pageSize
) => {
  const cours = await prismaClient.cours.findMany({
    where: filterCondition,
    skip,
    take: pageSize,
    include: {
      modules: true,
      niveau: true,
      categorie: true,
    },
  });

  const totalCours = await prismaClient.cours.count({
    where: filterCondition,
  });

  return { cours, totalCours };
};

export const createPaginationResponse = (
  cours,
  totalCours,
  currentPage,
  pageSize
) => {
  const totalPages = Math.ceil(totalCours / pageSize);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  return {
    cours,
    total: totalCours,
    currentPage,
    pageSize,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    message: "Récupération des cours réussie",
    status: "success",
  };
};
