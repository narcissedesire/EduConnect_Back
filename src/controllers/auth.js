import { hash } from "bcrypt";
import { prismaClient } from "../../prisma/prismaClient.js";
import jwt from "jsonwebtoken";
import { dataRegister, dataLogin } from "../utils/validation.js";
import { validateData } from "../utils/fonctionValidation.js";
import { createEnseignant } from "./enseignant.js";
import { createEtudiant } from "./etudiant.js";
import { removeAccents } from "../utils/removeAccent.js";
import { createSession, updateSession } from "./session.js";

export const register = async (req, res) => {
  try {
    const { nom, prenom, email, mot_passe, role } = validateData(
      req.body,
      dataRegister
    );

    const validRole = removeAccents(role);

    let user = await prismaClient.utilisateur.findFirst({ where: { email } });
    if (user) {
      throw Error("Utilisateur déjà existant");
    }

    const hashedPassword = await hash(mot_passe, 10);

    user = await prismaClient.utilisateur.create({
      data: {
        nom,
        prenom,
        email,
        mot_passe: hashedPassword,
        role: validRole,
      },
    });

    if (validRole === "enseignant") {
      createEnseignant(user.id);
    }
    createEtudiant(user.id);

    res.json({
      user,
      message: "Création de l'utilisateur réussi",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, mot_passe } = validateData(req.body, dataLogin);
    console.log(req.body);

    const user = await prismaClient.utilisateur.findFirst({ where: { email } });
    if (!user) {
      throw Error("Utilisateur inexistant");
    }

    const isPasswordValid = await hash(mot_passe, user.mot_passe);
    if (!isPasswordValid) {
      throw Error("Mot de passe incorrect");
    }

    const existingSession = await prismaClient.session.findFirst({
      where: {
        id_utilisateur: user.id,
        isValide: true,
      },
    });

    if (existingSession) {
      return res.json({
        user,
        token: existingSession.token,
        message: "Vous êtes déjà connecté",
        status: "success",
      });
    }

    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    await createSession(token, user.id);

    res.json({
      user,
      token,
      message: "Connexion réussie",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const Profile = async (req, res) => {
  try {
    const { id, role } = req.user;
    let userProfile;

    if (role === "etudiant") {
      userProfile = await prismaClient.utilisateur.findUnique({
        where: { id },
        include: {
          etudiant: {
            include: {
              niveau: true,
            },
          },
        },
      });
    } else if (role === "enseignant") {
      userProfile = await prismaClient.utilisateur.findUnique({
        where: { id },
        include: {
          enseignant: true,
        },
      });
    } else {
      userProfile = await prismaClient.utilisateur.findUnique({
        where: { id },
      });
    }

    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      throw Error("Jeton non fourni ou malformé");
    }
    await updateSession(token);

    res.status(200).json({ message: "Déconnexion réussie" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
