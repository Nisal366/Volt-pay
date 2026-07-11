const { db, FieldValue } = require("../config/firebase");
const { docToJson } = require("../utils/firestore");

async function upsertProfile(req, res) {
  const uid = req.user.uid;
  const userRef = db.collection("users").doc(uid);
  const existing = await userRef.get();

  const payload = {
    uid,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nic: req.body.nic,
    mobile: req.body.mobile,
    email: req.body.email || req.user.email || null,
    address: req.body.address || null,
    role: existing.exists && existing.data().role ? existing.data().role : "customer",
    updatedAt: FieldValue.serverTimestamp()
  };

  if (!existing.exists) {
    payload.createdAt = FieldValue.serverTimestamp();
  }

  await userRef.set(payload, { merge: true });
  const saved = await userRef.get();

  res.status(existing.exists ? 200 : 201).json({
    success: true,
    message: existing.exists ? "Profile updated." : "Profile created.",
    data: docToJson(saved)
  });
}

async function getMe(req, res) {
  const userDoc = await db.collection("users").doc(req.user.uid).get();

  res.json({
    success: true,
    data: {
      auth: req.user,
      profile: docToJson(userDoc)
    }
  });
}

module.exports = { upsertProfile, getMe };
