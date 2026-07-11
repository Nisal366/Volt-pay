function notFound(req, res, next) {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.status = 404;
  next(error);
}

function errorHandler(error, req, res, next) {
  const status = error.status || error.statusCode || 500;

  if (process.env.NODE_ENV !== "test") {
    console.error(error);
  }

  res.status(status).json({
    success: false,
    message: error.message || "Internal server error",
    details: error.details || undefined
  });
}

module.exports = { notFound, errorHandler };
