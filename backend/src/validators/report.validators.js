const { Joi } = require("./common");

const createReportSchema = Joi.object({
  meterId: Joi.string().trim().allow("", null),
  issueType: Joi.string()
    .valid("power_failure", "meter_fault", "billing_issue", "voltage_issue", "other")
    .required(),
  description: Joi.string().trim().min(10).max(1000).required(),
  location: Joi.string().trim().max(160).allow("", null)
});

const updateReportStatusSchema = Joi.object({
  status: Joi.string().valid("open", "in_progress", "resolved", "rejected").required(),
  adminNote: Joi.string().trim().max(500).allow("", null)
});

module.exports = { createReportSchema, updateReportStatusSchema };
