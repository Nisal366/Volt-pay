const { db } = require("../config/firebase");
const { snapshotToArray } = require("../utils/firestore");

async function listBills(req, res) {
  const status = req.query.status;
  let query = db.collection("bills").where("ownerUid", "==", req.user.uid);

  if (status) {
    query = query.where("status", "==", status);
  }

  const snap = await query.orderBy("createdAt", "desc").limit(50).get();

  res.json({
    success: true,
    data: snapshotToArray(snap)
  });
}

module.exports = { listBills };
