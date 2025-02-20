# Étape 1 : Utiliser une image Node.js officielle comme base
FROM node:22.12.0

# Étape 2 : Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Étape 3 : Copier le fichier package.json et package-lock.json
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier tout le contenu de votre projet dans le conteneur
COPY . .

# Étape 6 : Générer le client Prisma
RUN npx prisma generate

# Étape 7 : Exposer le port de votre application
EXPOSE 5000

# Étape 8 : Définir la commande pour démarrer l'application
CMD ["npm", "start"]
