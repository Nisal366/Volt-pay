const Joi = require("joi");

const sriLankanNic = Joi.string()
  .trim()
  .custom((value, helpers) => {
    const oldNic = /^[0-9]{9}[vVxX]$/.test(value);
    const newNic = /^[0-9]{12}$/.test(value);
    if (!oldNic && !newNic) {
      return helpers.error("any.invalid");
    }
    return value.toUpperCase();
  })
  .messages({
    "any.invalid": "NIC must be old format like 123456789V or new format with 12 digits."
  });

const mobile = Joi.string()
  .trim()
  .pattern(/^(?:\+94|0)?7\d{8}$/)
  .messages({
    "string.pattern.base": "Mobile number must be a valid Sri Lankan mobile number."
  });

const idParam = Joi.object({
  id: Joi.string().trim().required()
});

const meterIdParam = Joi.object({
  meterId: Joi.string().trim().required()
});

module.exports = { Joi, sriLankanNic, mobile, idParam, meterIdParam };
