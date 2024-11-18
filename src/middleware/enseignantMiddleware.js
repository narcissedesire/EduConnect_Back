export const enseignantMiddleware = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role === "enseignant") {
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
