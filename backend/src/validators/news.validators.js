const { Joi } = require("./common");

const createNewsSchema = Joi.object({
  title: Joi.string().trim().min(3).max(120).required(),
  description: Joi.string().trim().min(10).max(1000).required(),
  imageUrl: Joi.string().trim().uri().allow("", null),
  isPublished: Joi.boolean().default(true)
});

module.exports = { createNewsSchema };
