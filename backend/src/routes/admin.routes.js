const express = require("express");
const { requireAuth, requireAdmin } = require("../middleware/auth");
const { dashboard, listUsers } = require("../controllers/admin.controller");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.use(requireAuth, requireAdmin);
router.get("/dashboard", asyncHandler(dashboard));
router.get("/users", asyncHandler(listUsers));

module.exports = router;
