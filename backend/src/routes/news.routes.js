const express = require("express");
const validate = require("../middleware/validate");
const { requireAuth, requireAdmin } = require("../middleware/auth");
const upload = require("../middleware/upload");
const { createNewsSchema } = require("../validators/news.validators");
const { listNews, createNews } = require("../controllers/news.controller");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get("/", asyncHandler(listNews));
router.post("/", requireAuth, requireAdmin, upload.single("image"), validate(createNewsSchema), asyncHandler(createNews));

module.exports = router;
