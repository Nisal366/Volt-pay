const { db, FieldValue } = require("../config/firebase");
const { docToJson, snapshotToArray } = require("../utils/firestore");
const uploadBufferToCloudinary = require("../utils/uploadToCloudinary");

async function listNews(req, res) {
  const snap = await db
    .collection("news")
    .where("isPublished", "==", true)
    .orderBy("publishedAt", "desc")
    .limit(20)
    .get();

  res.json({
    success: true,
    data: snapshotToArray(snap)
  });
}

async function createNews(req, res) {
  let imageUrl = req.body.imageUrl || null;
  let image = null;

  if (req.file) {
    image = await uploadBufferToCloudinary(req.file.buffer, "voltpay/news");
    imageUrl = image.url;
  }

  const ref = await db.collection("news").add({
    title: req.body.title,
    description: req.body.description,
    imageUrl,
    image,
    isPublished: req.body.isPublished !== false,
    createdBy: req.user.uid,
    createdAt: FieldValue.serverTimestamp(),
    publishedAt: FieldValue.serverTimestamp()
  });

  const saved = await ref.get();

  res.status(201).json({
    success: true,
    message: "News published.",
    data: docToJson(saved)
  });
}

module.exports = { listNews, createNews };
