const { Joi } = require("./common");

const createMeterSchema = Joi.object({
  accountName: Joi.string().trim().min(2).max(80).required(),
  accountNumber: Joi.string().trim().min(5).max(40).required(),
  premisesId: Joi.string().trim().min(3).max(40).required(),
  meterNumber: Joi.string().trim().min(3).max(40).allow("", null),
  area: Joi.string().trim().max(80).allow("", null),
  nickname: Joi.string().trim().max(40).allow("", null)
});

const connectMeterSchema = Joi.object({
  method: Joi.string().valid("wifi", "qr", "manual").required(),
  deviceId: Joi.string().trim().min(3).max(80).required(),
  wifiSsid: Joi.string().trim().max(80).allow("", null)
});

module.exports = { createMeterSchema, connectMeterSchema };
