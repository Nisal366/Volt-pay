const express = require("express");
const validate = require("../middleware/validate");
const { requireAuth, requireAdmin } = require("../middleware/auth");
const upload = require("../middleware/upload");
const { idParam } = require("../validators/common");
const { createReportSchema, updateReportStatusSchema } = require("../validators/report.validators");
const {
  createReport,
  listMyReports,
  listAllReports,
  updateReportStatus
} = require("../controllers/report.controller");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.post("/", requireAuth, upload.single("image"), validate(createReportSchema), asyncHandler(createReport));
router.get("/mine", requireAuth, asyncHandler(listMyReports));
router.get("/admin/all", requireAuth, requireAdmin, asyncHandler(listAllReports));
router.patch(
  "/admin/:id/status",
  requireAuth,
  requireAdmin,
  validate(idParam, "params"),
  validate(updateReportStatusSchema),
  asyncHandler(updateReportStatus)
);

module.exports = router;
