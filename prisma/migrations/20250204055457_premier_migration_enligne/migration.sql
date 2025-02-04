-- CreateTable
CREATE TABLE `Utilisateur` (
    `id` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NULL,
    `age` INTEGER NULL,
    `email` VARCHAR(191) NOT NULL,
    `mot_passe` VARCHAR(191) NOT NULL,
    `role` ENUM('admin', 'etudiant', 'enseignant') NOT NULL DEFAULT 'etudiant',
    `validation` BOOLEAN NULL DEFAULT false,
    `id_photo` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Utilisateur_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Photo` (
    `id` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `isActif` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Enseignant` (
    `id` VARCHAR(191) NOT NULL,
    `specialite` VARCHAR(191) NULL,
    `matricule` VARCHAR(191) NULL,
    `id_utilisateur` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Enseignant_matricule_key`(`matricule`),
    UNIQUE INDEX `Enseignant_id_utilisateur_key`(`id_utilisateur`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Niveau` (
    `id` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Etudiant` (
    `id` VARCHAR(191) NOT NULL,
    `matricule` VARCHAR(191) NULL,
    `id_utilisateur` VARCHAR(191) NOT NULL,
    `id_niveau` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Etudiant_matricule_key`(`matricule`),
    UNIQUE INDEX `Etudiant_id_utilisateur_key`(`id_utilisateur`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Administrateur` (
    `id` VARCHAR(191) NOT NULL,
    `id_utilisateur` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Administrateur_id_utilisateur_key`(`id_utilisateur`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categorie` (
    `id` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cours` (
    `id` VARCHAR(191) NOT NULL,
    `titre` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `id_enseignant` VARCHAR(191) NOT NULL,
    `id_categorie` VARCHAR(191) NOT NULL,
    `id_photo` VARCHAR(191) NULL,
    `isGratuit` BOOLEAN NOT NULL DEFAULT false,
    `isCertifier` BOOLEAN NOT NULL DEFAULT false,
    `id_niveau` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NoteCours` (
    `id` VARCHAR(191) NOT NULL,
    `note` INTEGER NOT NULL,
    `id_etudiant` VARCHAR(191) NOT NULL,
    `id_cours` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Module` (
    `id` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `id_cours` VARCHAR(191) NOT NULL,
    `isTermine` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Video` (
    `id` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `liens` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `id_module` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fichier` (
    `id` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `liens` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `id_module` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Commentaire` (
    `id` VARCHAR(191) NOT NULL,
    `text` TEXT NOT NULL,
    `id_video` VARCHAR(191) NOT NULL,
    `id_utilisateur` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReponseComment` (
    `id` VARCHAR(191) NOT NULL,
    `text` TEXT NOT NULL,
    `id_comment` VARCHAR(191) NOT NULL,
    `id_utilisateur` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Devoir` (
    `id` VARCHAR(191) NOT NULL,
    `titre` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `text` TEXT NOT NULL,
    `date_limite` DATETIME(3) NULL,
    `id_cours` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inscrire` (
    `id` VARCHAR(191) NOT NULL,
    `id_etudiant` VARCHAR(191) NOT NULL,
    `id_cours` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Evaluation` (
    `id` VARCHAR(191) NOT NULL,
    `titre` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `date_limite` DATETIME(3) NOT NULL,
    `id_cours` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Question` (
    `id` VARCHAR(191) NOT NULL,
    `text` TEXT NOT NULL,
    `score` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `correctAnswer` VARCHAR(191) NOT NULL,
    `id_evaluation` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Option` (
    `id` VARCHAR(191) NOT NULL,
    `text` TEXT NOT NULL,
    `isCorrect` BOOLEAN NOT NULL DEFAULT false,
    `id_question` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Resultat` (
    `id` VARCHAR(191) NOT NULL,
    `id_question` VARCHAR(191) NOT NULL,
    `id_etudiant` VARCHAR(191) NOT NULL,
    `isCorrect` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Avis` (
    `id` VARCHAR(191) NOT NULL,
    `text` TEXT NOT NULL,
    `isAnonyme` BOOLEAN NOT NULL DEFAULT false,
    `id_utilisateur` VARCHAR(191) NOT NULL,
    `id_cours` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Conversation` (
    `id` VARCHAR(191) NOT NULL,
    `id_sender` VARCHAR(191) NOT NULL,
    `id_receiver` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` VARCHAR(191) NOT NULL,
    `text` TEXT NOT NULL,
    `id_sender` VARCHAR(191) NOT NULL,
    `id_conversation` VARCHAR(191) NOT NULL,
    `isImportant` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `id` VARCHAR(191) NOT NULL,
    `text` TEXT NOT NULL,
    `id_utilisateur` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Temoignage` (
    `id` VARCHAR(191) NOT NULL,
    `text` TEXT NOT NULL,
    `isAnonyme` BOOLEAN NOT NULL DEFAULT false,
    `id_utilisateur` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `token` TEXT NOT NULL,
    `isValide` BOOLEAN NOT NULL DEFAULT true,
    `id_utilisateur` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `expiresAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Utilisateur` ADD CONSTRAINT `Utilisateur_id_photo_fkey` FOREIGN KEY (`id_photo`) REFERENCES `Photo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enseignant` ADD CONSTRAINT `Enseignant_id_utilisateur_fkey` FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Etudiant` ADD CONSTRAINT `Etudiant_id_utilisateur_fkey` FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Etudiant` ADD CONSTRAINT `Etudiant_id_niveau_fkey` FOREIGN KEY (`id_niveau`) REFERENCES `Niveau`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Administrateur` ADD CONSTRAINT `Administrateur_id_utilisateur_fkey` FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cours` ADD CONSTRAINT `Cours_id_niveau_fkey` FOREIGN KEY (`id_niveau`) REFERENCES `Niveau`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cours` ADD CONSTRAINT `Cours_id_enseignant_fkey` FOREIGN KEY (`id_enseignant`) REFERENCES `Enseignant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cours` ADD CONSTRAINT `Cours_id_categorie_fkey` FOREIGN KEY (`id_categorie`) REFERENCES `Categorie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cours` ADD CONSTRAINT `Cours_id_photo_fkey` FOREIGN KEY (`id_photo`) REFERENCES `Photo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NoteCours` ADD CONSTRAINT `NoteCours_id_etudiant_fkey` FOREIGN KEY (`id_etudiant`) REFERENCES `Etudiant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NoteCours` ADD CONSTRAINT `NoteCours_id_cours_fkey` FOREIGN KEY (`id_cours`) REFERENCES `Cours`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Module` ADD CONSTRAINT `Module_id_cours_fkey` FOREIGN KEY (`id_cours`) REFERENCES `Cours`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Video` ADD CONSTRAINT `Video_id_module_fkey` FOREIGN KEY (`id_module`) REFERENCES `Module`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fichier` ADD CONSTRAINT `Fichier_id_module_fkey` FOREIGN KEY (`id_module`) REFERENCES `Module`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commentaire` ADD CONSTRAINT `Commentaire_id_video_fkey` FOREIGN KEY (`id_video`) REFERENCES `Video`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commentaire` ADD CONSTRAINT `Commentaire_id_utilisateur_fkey` FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReponseComment` ADD CONSTRAINT `ReponseComment_id_comment_fkey` FOREIGN KEY (`id_comment`) REFERENCES `Commentaire`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReponseComment` ADD CONSTRAINT `ReponseComment_id_utilisateur_fkey` FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Devoir` ADD CONSTRAINT `Devoir_id_cours_fkey` FOREIGN KEY (`id_cours`) REFERENCES `Cours`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inscrire` ADD CONSTRAINT `Inscrire_id_etudiant_fkey` FOREIGN KEY (`id_etudiant`) REFERENCES `Etudiant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inscrire` ADD CONSTRAINT `Inscrire_id_cours_fkey` FOREIGN KEY (`id_cours`) REFERENCES `Cours`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluation` ADD CONSTRAINT `Evaluation_id_cours_fkey` FOREIGN KEY (`id_cours`) REFERENCES `Cours`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_id_evaluation_fkey` FOREIGN KEY (`id_evaluation`) REFERENCES `Evaluation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Option` ADD CONSTRAINT `Option_id_question_fkey` FOREIGN KEY (`id_question`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Resultat` ADD CONSTRAINT `Resultat_id_question_fkey` FOREIGN KEY (`id_question`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Resultat` ADD CONSTRAINT `Resultat_id_etudiant_fkey` FOREIGN KEY (`id_etudiant`) REFERENCES `Etudiant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Avis` ADD CONSTRAINT `Avis_id_utilisateur_fkey` FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Avis` ADD CONSTRAINT `Avis_id_cours_fkey` FOREIGN KEY (`id_cours`) REFERENCES `Cours`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conversation` ADD CONSTRAINT `Conversation_id_sender_fkey` FOREIGN KEY (`id_sender`) REFERENCES `Utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conversation` ADD CONSTRAINT `Conversation_id_receiver_fkey` FOREIGN KEY (`id_receiver`) REFERENCES `Utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_id_sender_fkey` FOREIGN KEY (`id_sender`) REFERENCES `Utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_id_conversation_fkey` FOREIGN KEY (`id_conversation`) REFERENCES `Conversation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_id_utilisateur_fkey` FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Temoignage` ADD CONSTRAINT `Temoignage_id_utilisateur_fkey` FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_id_utilisateur_fkey` FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
