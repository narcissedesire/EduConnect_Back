export const etudiantMiddleware = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role === "etudiant") {
      next();
    } else {
      res.status(403).json({
        message: "Vous n'êtes pas autorisé à effectuer cette action.",
      });
    }
  } catch (error) {
    throw Error(error.message);
  }
};
