const cloudinary = require("cloudinary").v2;
const env = require("./env");

const isCloudinaryConfigured = Boolean(
  env.cloudinaryCloudName && env.cloudinaryApiKey && env.cloudinaryApiSecret
);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: env.cloudinaryCloudName,
    api_key: env.cloudinaryApiKey,
    api_secret: env.cloudinaryApiSecret
  });
}

module.exports = { cloudinary, isCloudinaryConfigured };
