const dayjs = require("dayjs");
const { db, FieldValue } = require("../config/firebase");
const { snapshotToArray } = require("../utils/firestore");

async function assertMeterOwner(meterId, uid) {
  const meter = await db.collection("meters").doc(meterId).get();
  if (!meter.exists || meter.data().ownerUid !== uid) {
    const error = new Error("Meter not found.");
    error.status = 404;
    throw error;
  }
  return meter;
}

async function listUsage(req, res) {
  const { meterId } = req.params;
  const limit = Math.min(Number(req.query.limit || 30), 90);

  await assertMeterOwner(meterId, req.user.uid);

  const snap = await db
    .collection("usageRecords")
    .where("meterId", "==", meterId)
    .orderBy("readingDate", "desc")
    .limit(limit)
    .get();

  res.json({
    success: true,
    data: snapshotToArray(snap)
  });
}

async function seedDemoUsage(req, res) {
  const { meterId } = req.params;
  await assertMeterOwner(meterId, req.user.uid);

  const batch = db.batch();
  const today = dayjs().startOf("day");
  let totalUnits = 0;

  for (let i = 29; i >= 0; i--) {
    const unitsUsed = Number((Math.random() * 10 + 4).toFixed(2));
    totalUnits += unitsUsed;

    const ref = db.collection("usageRecords").doc();
    batch.set(ref, {
      meterId,
      ownerUid: req.user.uid,
      readingDate: today.subtract(i, "day").toDate(),
      unitsUsed,
      peakUsageKw: Number((Math.random() * 3 + 1).toFixed(2)),
      estimatedAmount: Number((unitsUsed * 55).toFixed(2)),
      createdAt: FieldValue.serverTimestamp()
    });
  }

  const billRef = db.collection("bills").doc();
  batch.set(billRef, {
    meterId,
    ownerUid: req.user.uid,
    billMonth: today.format("YYYY-MM"),
    unitsUsed: Number(totalUnits.toFixed(2)),
    amount: Number((totalUnits * 55).toFixed(2)),
    status: "unpaid",
    dueDate: today.add(14, "day").toDate(),
    createdAt: FieldValue.serverTimestamp()
  });

  await batch.commit();

  res.status(201).json({
    success: true,
    message: "Demo usage records and monthly bill created."
  });
}

module.exports = { listUsage, seedDemoUsage };
