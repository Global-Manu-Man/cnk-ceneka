import cloudinary from './cloudinary.js';

const uploadToCloudinary = async (filePath) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, { folder: "real_estate" }, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

export default uploadToCloudinary;