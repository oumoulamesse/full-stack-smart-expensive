const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token manquant" });
    }

    // Format: Bearer token
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "Token invalide" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // on stocke user dans req
    next();

  } catch (error) {
    return res.status(401).json({ message: "Non autorisé" });
  }
};