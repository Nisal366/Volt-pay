const dotenv = require("dotenv");

dotenv.config();

const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",

  googleApplicationCredentials: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  firebaseServiceAccountBase64: process.env.FIREBASE_SERVICE_ACCOUNT_BASE64,
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
  firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  firebasePrivateKey: process.env.FIREBASE_PRIVATE_KEY,

  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,

  payhereMerchantId: process.env.PAYHERE_MERCHANT_ID,
  payhereMerchantSecret: process.env.PAYHERE_MERCHANT_SECRET,
  payhereCurrency: process.env.PAYHERE_CURRENCY || "LKR",
  payhereSandbox: String(process.env.PAYHERE_SANDBOX || "true") === "true"
};

module.exports = env;
