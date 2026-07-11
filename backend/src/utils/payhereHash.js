const crypto = require("crypto");

function md5Upper(value) {
  return crypto.createHash("md5").update(String(value)).digest("hex").toUpperCase();
}

function formatAmount(amount) {
  const number = Number(amount);
  if (!Number.isFinite(number) || number <= 0) {
    throw new Error("Amount must be a positive number.");
  }
  return number.toFixed(2);
}

function createPayHereHash({ merchantId, orderId, amount, currency, merchantSecret }) {
  if (!merchantId || !orderId || !currency || !merchantSecret) {
    throw new Error("Missing PayHere hash fields.");
  }

  const formattedAmount = formatAmount(amount);
  const hashedSecret = md5Upper(merchantSecret);
  return md5Upper(`${merchantId}${orderId}${formattedAmount}${currency}${hashedSecret}`);
}

module.exports = { createPayHereHash, formatAmount };
