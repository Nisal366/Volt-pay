const { Joi } = require("./common");

const mockPaymentSchema = Joi.object({
  billId: Joi.string().trim().required(),
  amount: Joi.number().positive().required(),
  method: Joi.string().valid("card", "bank_transfer", "wallet", "cash").default("card")
});

const payhereHashSchema = Joi.object({
  orderId: Joi.string().trim().min(3).max(80).required(),
  amount: Joi.number().positive().required(),
  currency: Joi.string().trim().uppercase().length(3).default("LKR")
});

module.exports = { mockPaymentSchema, payhereHashSchema };
