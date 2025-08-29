import { reverseGeocode } from '../utils/geocode.js';
import { Advert } from '../models/advertSchema.js';
import NotFound from 'http-errors';
import mongoose from 'mongoose';

// Отримати всі оголошення (з фільтрами та пагінацією)
export const getAdvertsService = async (
  filter = {},
  { page = 1, limit = 20 } = {},
) => {
  const skip = (page - 1) * limit;

  const adverts = await Advert.find(filter)
    .populate('user', 'name email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Advert.countDocuments(filter);

  return {
    data: adverts,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// Отримати одне оголошення за id
export const getAdvertByIdService = async (id) => {
  if (!mongoose.isValidObjectId(id)) throw new NotFound('Invalid advert id');

  const advert = await Advert.findById(id).populate('user', 'name email');
  if (!advert) throw new NotFound('Advert not found');

  return advert;
};

// Створити нове оголошення
export const createAdvertService = async (data) => {
  if (data.context?.location?.coordinates?.coordinates) {
    const [lng, lat] = data.context.location.coordinates.coordinates;
    const address = await reverseGeocode(lat, lng);

    data.context.location = {
      ...data.context.location,
      ...address,
    };
  }

  const newAdvert = await Advert.create(data);
  return newAdvert;
};

// Оновити оголошення повністю
export const updateAdvertService = async (id, data) => {
  if (!mongoose.isValidObjectId(id)) throw new NotFound('Invalid advert id');

  const updatedAdvert = await Advert.findByIdAndUpdate(id, data, { new: true });
  if (!updatedAdvert) throw new NotFound('Advert not found');

  return updatedAdvert;
};
