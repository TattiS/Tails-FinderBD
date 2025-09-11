import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
import { getEnvVar } from './getEnvVar.js';
import { CLOUDINARY } from '../constants/index.js';

cloudinary.config({
  secure: true,
  cloud_name: getEnvVar(CLOUDINARY.CLOUD_NAME),
  api_key: getEnvVar(CLOUDINARY.API_KEY),
  api_secret: getEnvVar(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  try {
    const response = await cloudinary.uploader.upload(file.path, {
      resource_type: 'auto',
      folder: 'adverts',
    });

    return response.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  } finally {
    await fs.unlink(file.path);
  }
};
