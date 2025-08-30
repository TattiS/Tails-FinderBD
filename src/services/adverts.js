import { reverseGeocode } from '../utils/geocode.js';
import { Advert } from '../models/advertSchema.js';
import NotFound from 'http-errors';
import mongoose from 'mongoose';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

// Отримати всі оголошення (з фільтрами та пагінацією)
export const getAdvertsService = async (filter, options = {}) => {
  const {
    skip = 0,
    limit = 20,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    countOnly = false,
  } = options;

  if (countOnly) {
    return await Advert.countDocuments(filter);
  }

  const data = await Advert.find(filter)
    .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
    .skip(skip)
    .limit(limit)
    .populate('user', 'name email');

  return data;
};

// Отримати одне оголошення за id
export const getAdvertByIdService = async (id) => {
  if (!mongoose.isValidObjectId(id)) throw new NotFound('Invalid advert id');

  const advert = await Advert.findById(id).populate('user', 'name email');
  if (!advert) throw new NotFound('Advert not found');

  return advert;
};

// Створити нове оголошення
export const createAdvertService = async (data, files = []) => {
  if (data.context?.location?.coordinates?.coordinates) {
    const [lng, lat] = data.context.location.coordinates.coordinates;
    const address = await reverseGeocode(lat, lng);

    data.context.location = {
      ...data.context.location,
      ...address,
    };
  }

  if (files.length > 0) {
    const results = await Promise.allSettled(
      files.map((file) => saveFileToCloudinary(file.path, 'adverts')),
    );

    const photosUrls = results
      .filter((res) => res.status === 'fulfilled')
      .map((res) => res.value);

    data.photos = photosUrls;
  }

  const newAdvert = await Advert.create(data);
  return newAdvert;
};

// Оновити оголошення повністю
export const updateAdvertService = async (id, data, files = []) => {
  if (!mongoose.isValidObjectId(id)) throw new NotFound('Invalid advert id');

  if (data.context?.location?.coordinates?.coordinates) {
    const [lng, lat] = data.context.location.coordinates.coordinates;
    const address = await reverseGeocode(lat, lng);

    data.context.location = {
      ...data.context.location,
      ...address,
    };
  }

  if (files.length > 0) {
    const results = await Promise.allSettled(
      files.map((file) => saveFileToCloudinary(file.path, 'adverts')),
    );

    const photosUrls = results
      .filter((res) => res.status === 'fulfilled')
      .map((res) => res.value);

    const advert = await Advert.findById(id);
    if (!advert) throw new NotFound('Advert not found');
    data.photos = [...(advert.photos || []), ...photosUrls];
  }

  const updatedAdvert = await Advert.findByIdAndUpdate(id, data, { new: true });
  if (!updatedAdvert) throw new NotFound('Advert not found');

  return updatedAdvert;
};
