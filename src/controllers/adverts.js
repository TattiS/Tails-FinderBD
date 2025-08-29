import {
  getAdvertsService,
  getAdvertByIdService,
  createAdvertService,
  updateAdvertService,
} from '../services/adverts.js';
import { findMatchingAdvertsService } from '../services/matchingAdvert.js';
import { notifyUsersService } from '../services/notification.js';

// GET /adverts?status=lost&species=dog&page=1&limit=10
export const getAdvertsController = async (req, res) => {
  const { page = 1, limit = 20, ...filters } = req.query;

  // Фільтруємо status, species, colors, city
  const filter = { ...filters };

  const result = await getAdvertsService(filter, {
    page: Number(page),
    limit: Number(limit),
  });

  res.status(200).json({
    status: 200,
    data: result.data,
    pagination: result.pagination,
  });
};

// GET /adverts/:id
export const getAdvertByIdController = async (req, res) => {
  const { id } = req.params;

  const advert = await getAdvertByIdService(id);

  res.status(200).json({
    status: 200,
    data: advert,
  });
};

// POST /adverts
export const createAdvertController = async (req, res) => {
  const data = req.body;
  data.user = req.user._id; // автор з authenticate

  const newAdvert = await createAdvertService(data);
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
  const data = req.body;

  const updatedAdvert = await updateAdvertService(id, data);

  res.status(200).json({
    status: 200,
    message: 'Advert successfully updated!',
    data: updatedAdvert,
  });
};
