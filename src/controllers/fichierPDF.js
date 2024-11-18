export const createFichiers = (fichiers) => {
  return fichiers.map((fichier) => ({
    nom: fichier.nom,
    contenu: fichier.contenu,
    description: fichier.description,
  }));
};

export const updateFichiers = async (prismaClient, fichiers, moduleId) => {
  for (const fichier of fichiers) {
    if (fichier.id) {
      // Mettre à jour le fichier existant
      await prismaClient.fichier.update({
        where: { id: fichier.id },
        data: {
          nom: fichier.nom,
          contenu: fichier.contenu,
          description: fichier.description,
        },
      });
    } else {
      throw new Error("Fichier n'est pas trouver");
    }
  }
};
