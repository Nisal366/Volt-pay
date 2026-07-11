const { Joi, sriLankanNic, mobile } = require("./common");

const profileSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(60).required(),
  lastName: Joi.string().trim().min(2).max(60).required(),
  nic: sriLankanNic.required(),
  mobile: mobile.required(),
  email: Joi.string().trim().email().allow("", null),
  address: Joi.string().trim().max(180).allow("", null)
});

module.exports = { profileSchema };
