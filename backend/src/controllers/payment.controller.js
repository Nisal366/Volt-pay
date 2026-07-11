const { v4: uuidv4 } = require("uuid");
const { db, FieldValue } = require("../config/firebase");
const { docToJson } = require("../utils/firestore");
const { createPayHereHash, formatAmount } = require("../utils/payhereHash");
const env = require("../config/env");

async function createMockPayment(req, res) {
  const billRef = db.collection("bills").doc(req.body.billId);
  const billDoc = await billRef.get();

  if (!billDoc.exists || billDoc.data().ownerUid !== req.user.uid) {
    return res.status(404).json({ success: false, message: "Bill not found." });
  }

  const bill = billDoc.data();
  if (bill.status === "paid") {
    return res.status(400).json({ success: false, message: "Bill is already paid." });
  }

  const paymentRef = db.collection("payments").doc();

  await db.runTransaction(async (tx) => {
    tx.set(paymentRef, {
      ownerUid: req.user.uid,
      billId: req.body.billId,
      meterId: bill.meterId,
      amount: Number(req.body.amount),
      method: req.body.method,
      status: "paid",
      provider: "mock",
      reference: `VP-${uuidv4().slice(0, 8).toUpperCase()}`,
      paidAt: FieldValue.serverTimestamp(),
      createdAt: FieldValue.serverTimestamp()
    });

    tx.update(billRef, {
      status: "paid",
      paidAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    });
  });

  const saved = await paymentRef.get();

  res.status(201).json({
    success: true,
    message: "Mock payment completed.",
    data: docToJson(saved)
  });
}

async function createPayHereHashController(req, res) {
  if (!env.payhereMerchantId || !env.payhereMerchantSecret) {
    return res.status(500).json({
      success: false,
      message: "PayHere is not configured. Add PAYHERE_MERCHANT_ID and PAYHERE_MERCHANT_SECRET."
    });
  }

  const amount = formatAmount(req.body.amount);
  const currency = req.body.currency || env.payhereCurrency;

  const hash = createPayHereHash({
    merchantId: env.payhereMerchantId,
    orderId: req.body.orderId,
    amount,
    currency,
    merchantSecret: env.payhereMerchantSecret
  });

  res.json({
    success: true,
    data: {
      merchantId: env.payhereMerchantId,
      orderId: req.body.orderId,
      amount,
      currency,
      sandbox: env.payhereSandbox,
      hash
    }
  });
}

module.exports = { createMockPayment, createPayHereHashController };
