import mongoose from 'mongoose';
import createHttpError from 'http-errors';
import {
  getAdvertsService,
  getAdvertByIdService,
  createAdvertService,
  updateAdvertService,
} from '../services/adverts.js';
import {
  addAdvertToUserService,
  updateNotificationsService,
} from '../services/user.js';
import { findMatchingAdvertsService } from '../services/matchingAdvert.js';
import { notifyUsersService } from '../services/notification.js';

// GET /adverts/start
export const getLatestAdvertsController = async (req, res) => {
  const adverts = await getAdvertsService(
    {},
    {
      limit: 6,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    },
  );

  res.status(200).json({
    status: 200,
    message: 'Successfully found animal ads!',
    data: adverts,
  });
};

// GET /adverts?status=lost&species=Собака&colors=Чорний,Білий&city=Kyiv&page=1&perPage=20&sortBy=createdAt&sortOrder=desc
export const getAdvertsController = async (req, res) => {
  const {
    page = 1,
    perPage = 20,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    ...filters
  } = req.query;

  const pageNumber = Math.max(Number(page), 1);
  const limit = Math.max(Number(perPage), 1);
  const skip = (pageNumber - 1) * limit;

  const filter = {};

  if (filters.archived) filter.archived = filters.archived;
  if (filters.status) filter.status = filters.status;
  if (filters.species) filter['animal.species'] = filters.species;
  if (filters.colors)
    filter['animal.colors'] = { $in: filters.colors.split(',') };
  if (filters.city) filter['context.location.city'] = filters.city;
  if (filters.district) filter['context.location.district'] = filters.district;

  const adverts = await getAdvertsService(filter, {
    skip,
    limit,
    sortBy,
    sortOrder,
  });

  const total = await getAdvertsService(filter, { countOnly: true });

  res.status(200).json({
    status: 200,
    data: adverts,
    pagination: {
      total,
      page: pageNumber,
      perPage: limit,
      totalPages: Math.ceil(total / limit),
    },
  });
};

// GET /adverts/:id
export const getAdvertByIdController = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(createHttpError(400, 'Invalid advert ID format'));
  }

  const advert = await getAdvertByIdService(id);

  if (!advert) {
    return next(createHttpError(404, 'Advert not found'));
  }

  res.status(200).json({
    status: 200,
    data: advert,
  });
};

// POST /adverts
export const createAdvertController = async (req, res) => {
  const data = req.body;
  data.user = req.user._id; // автор з authenticate
  data.notificationsAllowed = data.notificationsAllowed === 'true';

  const newAdvert = await createAdvertService(data, req.files || []);

  await addAdvertToUserService(req.user._id, newAdvert._id);

  if (data.notificationsAllowed !== undefined) {
    await updateNotificationsService(req.user._id, data.notificationsAllowed);
  }

  const matches = await findMatchingAdvertsService(newAdvert);
  if (matches.length > 0) {
    await notifyUsersService(matches, newAdvert);
  }

  res.status(201).json({
    status: 201,
    message: 'Advert successfully created!',
    data: newAdvert,
  });
};

// PATCH /adverts/:id
export const updateAdvertController = async (req, res) => {
  const { id } = req.params;
  const data = req.body || {};
  const files = req.files || [];

  if (!Object.keys(data).length && files.length === 0) {
    return res.status(400).json({ message: 'No data provided for update' });
  }

  const updatedAdvert = await updateAdvertService(id, data, files);

  res.status(200).json({
    status: 200,
    message: 'Advert successfully updated!',
    data: updatedAdvert,
  });
};
