const express = require("express");
const validate = require("../middleware/validate");
const { requireAuth } = require("../middleware/auth");
const { profileSchema } = require("../validators/auth.validators");
const { upsertProfile, getMe } = require("../controllers/auth.controller");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.post("/profile", requireAuth, validate(profileSchema), asyncHandler(upsertProfile));
router.get("/me", requireAuth, asyncHandler(getMe));

module.exports = router;
