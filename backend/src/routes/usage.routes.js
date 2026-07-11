const express = require("express");
const validate = require("../middleware/validate");
const { requireAuth } = require("../middleware/auth");
const { meterIdParam } = require("../validators/common");
const { listUsage, seedDemoUsage } = require("../controllers/usage.controller");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.use(requireAuth);
router.get("/:meterId", validate(meterIdParam, "params"), asyncHandler(listUsage));
router.post("/:meterId/demo-seed", validate(meterIdParam, "params"), asyncHandler(seedDemoUsage));

module.exports = router;
