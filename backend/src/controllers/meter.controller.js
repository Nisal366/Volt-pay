const { db, FieldValue } = require("../config/firebase");
const { docToJson, snapshotToArray } = require("../utils/firestore");

async function createMeter(req, res) {
  const payload = {
    ownerUid: req.user.uid,
    accountName: req.body.accountName,
    accountNumber: req.body.accountNumber,
    premisesId: req.body.premisesId,
    meterNumber: req.body.meterNumber || null,
    area: req.body.area || null,
    nickname: req.body.nickname || req.body.accountName,
    connectionStatus: "not_connected",
    status: "active",
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp()
  };

  const ref = await db.collection("meters").add(payload);
  const saved = await ref.get();

  res.status(201).json({
    success: true,
    message: "Smart meter added.",
    data: docToJson(saved)
  });
}

async function listMeters(req, res) {
  const snap = await db
    .collection("meters")
    .where("ownerUid", "==", req.user.uid)
    .orderBy("createdAt", "desc")
    .get();

  res.json({
    success: true,
    data: snapshotToArray(snap)
  });
}

async function getMeter(req, res) {
  const doc = await db.collection("meters").doc(req.params.id).get();

  if (!doc.exists || doc.data().ownerUid !== req.user.uid) {
    return res.status(404).json({ success: false, message: "Meter not found." });
  }

  res.json({
    success: true,
    data: docToJson(doc)
  });
}

async function connectMeter(req, res) {
  const ref = db.collection("meters").doc(req.params.id);
  const doc = await ref.get();

  if (!doc.exists || doc.data().ownerUid !== req.user.uid) {
    return res.status(404).json({ success: false, message: "Meter not found." });
  }

  await ref.update({
    connectionStatus: "connected",
    connection: {
      method: req.body.method,
      deviceId: req.body.deviceId,
      wifiSsid: req.body.wifiSsid || null,
      connectedAt: FieldValue.serverTimestamp()
    },
    updatedAt: FieldValue.serverTimestamp()
  });

  const saved = await ref.get();

  res.json({
    success: true,
    message: "Smart meter connected.",
    data: docToJson(saved)
  });
}

async function deleteMeter(req, res) {
  const ref = db.collection("meters").doc(req.params.id);
  const doc = await ref.get();

  if (!doc.exists || doc.data().ownerUid !== req.user.uid) {
    return res.status(404).json({ success: false, message: "Meter not found." });
  }

  await ref.update({
    status: "deleted",
    deletedAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp()
  });

  res.json({
    success: true,
    message: "Meter removed from your account."
  });
}

module.exports = { createMeter, listMeters, getMeter, connectMeter, deleteMeter };
