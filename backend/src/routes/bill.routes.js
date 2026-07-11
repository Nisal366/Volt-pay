const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { listBills } = require("../controllers/bill.controller");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.use(requireAuth);
router.get("/", asyncHandler(listBills));

module.exports = router;
