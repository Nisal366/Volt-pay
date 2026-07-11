const express = require("express");
const validate = require("../middleware/validate");
const { requireAuth } = require("../middleware/auth");
const { idParam } = require("../validators/common");
const { createMeterSchema, connectMeterSchema } = require("../validators/meter.validators");
const {
  createMeter,
  listMeters,
  getMeter,
  connectMeter,
  deleteMeter
} = require("../controllers/meter.controller");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.use(requireAuth);
router.post("/", validate(createMeterSchema), asyncHandler(createMeter));
router.get("/", asyncHandler(listMeters));
router.get("/:id", validate(idParam, "params"), asyncHandler(getMeter));
router.patch("/:id/connect", validate(idParam, "params"), validate(connectMeterSchema), asyncHandler(connectMeter));
router.delete("/:id", validate(idParam, "params"), asyncHandler(deleteMeter));

module.exports = router;
