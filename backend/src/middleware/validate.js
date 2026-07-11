function validate(schema, property = "body") {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        details: error.details.map((detail) => detail.message)
      });
    }

    req[property] = value;
    next();
  };
}

module.exports = validate;
