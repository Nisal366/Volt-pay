const faq = [
  {
    keywords: ["bill", "payment", "pay"],
    answer: "You can view bills in the Bills section and make a demo payment through Easy Pay. Real payment gateway activation can be connected later."
  },
  {
    keywords: ["meter", "connect", "smart"],
    answer: "Go to Add Smart Meter, enter your CEB account details, then choose Wi-Fi, QR, or manual connection."
  },
  {
    keywords: ["issue", "complaint", "fault", "power"],
    answer: "Use Report Issue to submit a power failure, meter fault, voltage issue, billing issue, or another service request."
  },
  {
    keywords: ["usage", "units", "consumption"],
    answer: "The Usage section shows daily unit consumption and estimated bill value for connected meters."
  }
];

async function chat(req, res) {
  const message = String(req.body.message || "").toLowerCase();

  if (!message.trim()) {
    return res.status(400).json({
      success: false,
      message: "Message is required."
    });
  }

  const matched = faq.find((item) => item.keywords.some((key) => message.includes(key)));

  res.json({
    success: true,
    data: {
      answer: matched
        ? matched.answer
        : "I can help with bills, smart meters, electricity usage, payments, and issue reporting."
    }
  });
}

module.exports = { chat };
