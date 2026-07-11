const { cloudinary, isCloudinaryConfigured } = require("../config/cloudinary");

function uploadBufferToCloudinary(buffer, folder = "voltpay") {
  if (!isCloudinaryConfigured) {
    const error = new Error("Cloudinary is not configured. Add Cloudinary values to .env.");
    error.status = 500;
    throw error;
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        transformation: [
          { width: 1600, height: 1600, crop: "limit" },
          { quality: "auto", fetch_format: "auto" }
        ]
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
          format: result.format
        });
      }
    );

    stream.end(buffer);
  });
}

module.exports = uploadBufferToCloudinary;
