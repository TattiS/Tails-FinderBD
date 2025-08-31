import { ImageAnnotatorClient } from '@google-cloud/vision';
import { getEnvVar } from '../utils/getEnvVar.js';

const credentials = JSON.parse(
  getEnvVar('GOOGLE_APPLICATION_CREDENTIALS_JSON'),
);

export const visionClient = new ImageAnnotatorClient({ credentials });

export const getImageTags = async (filePath) => {
  try {
    const [result] = await visionClient.labelDetection(filePath);
    const labels = result.labelAnnotations;
    return labels.map((label) => label.description.toLowerCase());
  } catch (err) {
    console.error('Google Vision API error:', err.message);
    return [];
  }
};
