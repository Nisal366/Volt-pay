const { db, FieldValue } = require("../config/firebase");

async function submitContact(req, res) {
  const { name, email, mobile, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({
      success: false,
      message: "Name and message are required."
    });
  }

  await db.collection("contactMessages").add({
    name,
    email: email || null,
    mobile: mobile || null,
    message,
    status: "new",
    createdAt: FieldValue.serverTimestamp()
  });

  res.status(201).json({
    success: true,
    message: "Message submitted."
  });
}

module.exports = { submitContact };
