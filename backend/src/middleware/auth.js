const { verifyAccessToken } = require("../utils/jwt");

const verifyToken = (req, res, next) => {
  // Authorization: Bearer <TOKEN>
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Unauthorized: No token provided or malformed header" });
  }

  const token = authHeader.split(' ')[1]; // Extrahiere den Token

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded; // Hänge User-Info an das req-Objekt
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    // Wenn der Access Token abgelaufen ist, sollte der Client den /refresh Endpunkt aufrufen
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Role-based middleware
const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ message: "Forbidden: Insufficient role" });
    }
    next();
  };
};

module.exports = {
  verifyToken,
  requireRole,
};