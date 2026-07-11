const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const env = require("./config/env");
const apiRoutes = require("./routes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

const allowedOrigins = env.corsOrigin.split(",").map((origin) => origin.trim());

app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS."));
  },
  credentials: true
}));

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  standardHeaders: true,
  legacyHeaders: false
}));

if (env.nodeEnv !== "test") {
  app.use(morgan("dev"));
}

app.use("/api", apiRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
