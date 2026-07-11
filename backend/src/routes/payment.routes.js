const express = require("express");
const validate = require("../middleware/validate");
const { requireAuth } = require("../middleware/auth");
const { mockPaymentSchema, payhereHashSchema } = require("../validators/payment.validators");
const {
  createMockPayment,
  createPayHereHashController
} = require("../controllers/payment.controller");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.use(requireAuth);
router.post("/mock", validate(mockPaymentSchema), asyncHandler(createMockPayment));
router.post("/payhere/hash", validate(payhereHashSchema), asyncHandler(createPayHereHashController));

module.exports = router;
