const { auth, db } = require("../config/firebase");

async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const [scheme, token] = header.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        success: false,
        message: "Authorization header must be: Bearer <Firebase ID token>"
      });
    }

    const decoded = await auth.verifyIdToken(token);
    req.user = {
      uid: decoded.uid,
      email: decoded.email || null,
      phoneNumber: decoded.phone_number || null,
      admin: Boolean(decoded.admin)
    };

    next();
  } catch (error) {
    error.status = 401;
    error.message = "Invalid or expired Firebase ID token.";
    next(error);
  }
}

async function optionalAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) return next();

  try {
    const decoded = await auth.verifyIdToken(token);
    req.user = {
      uid: decoded.uid,
      email: decoded.email || null,
      phoneNumber: decoded.phone_number || null,
      admin: Boolean(decoded.admin)
    };
  } catch (error) {
    // Ignore invalid optional token.
  }

  next();
}

async function requireAdmin(req, res, next) {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Login required." });
    }

    if (req.user.admin) return next();

    const userDoc = await db.collection("users").doc(req.user.uid).get();
    const role = userDoc.exists ? userDoc.data().role : null;

    if (role === "admin") return next();

    return res.status(403).json({
      success: false,
      message: "Admin access required."
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { requireAuth, optionalAuth, requireAdmin };
