const { db, FieldValue } = require("../config/firebase");
const { docToJson, snapshotToArray } = require("../utils/firestore");
const uploadBufferToCloudinary = require("../utils/uploadToCloudinary");

async function ensureMeterBelongsToUser(meterId, uid) {
  if (!meterId) return;
  const meter = await db.collection("meters").doc(meterId).get();
  if (!meter.exists || meter.data().ownerUid !== uid) {
    const error = new Error("Selected meter was not found.");
    error.status = 404;
    throw error;
  }
}

async function createReport(req, res) {
  await ensureMeterBelongsToUser(req.body.meterId, req.user.uid);

  let image = null;
  if (req.file) {
    image = await uploadBufferToCloudinary(req.file.buffer, "voltpay/reports");
  }

  const ref = await db.collection("reports").add({
    ownerUid: req.user.uid,
    meterId: req.body.meterId || null,
    issueType: req.body.issueType,
    description: req.body.description,
    location: req.body.location || null,
    image,
    status: "open",
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp()
  });

  const saved = await ref.get();

  res.status(201).json({
    success: true,
    message: "Issue report submitted.",
    data: docToJson(saved)
  });
}

async function listMyReports(req, res) {
  const snap = await db
    .collection("reports")
    .where("ownerUid", "==", req.user.uid)
    .orderBy("createdAt", "desc")
    .limit(50)
    .get();

  res.json({
    success: true,
    data: snapshotToArray(snap)
  });
}

async function listAllReports(req, res) {
  const status = req.query.status;
  let query = db.collection("reports");

  if (status) query = query.where("status", "==", status);

  const snap = await query.orderBy("createdAt", "desc").limit(100).get();

  res.json({
    success: true,
    data: snapshotToArray(snap)
  });
}

async function updateReportStatus(req, res) {
  const ref = db.collection("reports").doc(req.params.id);
  const doc = await ref.get();

  if (!doc.exists) {
    return res.status(404).json({ success: false, message: "Report not found." });
  }

  await ref.update({
    status: req.body.status,
    adminNote: req.body.adminNote || null,
    reviewedBy: req.user.uid,
    updatedAt: FieldValue.serverTimestamp()
  });

  const saved = await ref.get();

  res.json({
    success: true,
    message: "Report status updated.",
    data: docToJson(saved)
  });
}

module.exports = { createReport, listMyReports, listAllReports, updateReportStatus };
