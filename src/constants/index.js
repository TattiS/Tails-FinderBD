import path from 'node:path';

// Сортування оголошень
export const ADVERT_SORT_KEYS = [
  '_id',
  'status',
  'animal.species',
  'context.location.city',
  'context.date',
  'createdAt',
  'updatedAt',
];

// Порядок сортування
export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

// Часові константи для сесій / токенів (мс)
export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const ONE_DAY = 24 * 60 * 60 * 1000;

// Тимчасова папка для завантажених файлів перед відправкою на хмару
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');

// Конфігурація Cloudinary для фото тварин
export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'API_KEY',
  API_SECRET: 'API_SECRET',
};

// Swagger документація API
export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
