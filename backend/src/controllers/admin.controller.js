const { db } = require("../config/firebase");
const { snapshotToArray } = require("../utils/firestore");

async function dashboard(req, res) {
  const [users, meters, reports, bills] = await Promise.all([
    db.collection("users").limit(1000).get(),
    db.collection("meters").where("status", "==", "active").limit(1000).get(),
    db.collection("reports").where("status", "in", ["open", "in_progress"]).limit(1000).get(),
    db.collection("bills").where("status", "==", "unpaid").limit(1000).get()
  ]);

  res.json({
    success: true,
    data: {
      users: users.size,
      activeMeters: meters.size,
      activeReports: reports.size,
      unpaidBills: bills.size
    }
  });
}

async function listUsers(req, res) {
  const snap = await db.collection("users").orderBy("createdAt", "desc").limit(100).get();

  res.json({
    success: true,
    data: snapshotToArray(snap)
  });
}

module.exports = { dashboard, listUsers };
