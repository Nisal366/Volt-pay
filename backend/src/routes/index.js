const express = require("express");

const authRoutes = require("./auth.routes");
const meterRoutes = require("./meter.routes");
const usageRoutes = require("./usage.routes");
const billRoutes = require("./bill.routes");
const paymentRoutes = require("./payment.routes");
const reportRoutes = require("./report.routes");
const newsRoutes = require("./news.routes");
const officeRoutes = require("./office.routes");
const contactRoutes = require("./contact.routes");
const chatRoutes = require("./chat.routes");
const adminRoutes = require("./admin.routes");

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "VOLTPAY backend is running.",
    timestamp: new Date().toISOString()
  });
});

router.use("/auth", authRoutes);
router.use("/meters", meterRoutes);
router.use("/usage", usageRoutes);
router.use("/bills", billRoutes);
router.use("/payments", paymentRoutes);
router.use("/reports", reportRoutes);
router.use("/news", newsRoutes);
router.use("/offices", officeRoutes);
router.use("/contact", contactRoutes);
router.use("/chat", chatRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
