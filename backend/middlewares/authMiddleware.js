const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No se proporcionó token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; //se guarda la información del usuario en la solicitud
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalido o expirado" });
  }
}

module.exports = authMiddleware;
