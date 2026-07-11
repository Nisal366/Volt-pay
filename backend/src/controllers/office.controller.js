const { db } = require("../config/firebase");
const { snapshotToArray } = require("../utils/firestore");

async function listOffices(req, res) {
  const snap = await db.collection("offices").orderBy("province").get();

  res.json({
    success: true,
    data: snapshotToArray(snap)
  });
}

module.exports = { listOffices };
