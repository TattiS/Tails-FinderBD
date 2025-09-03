import mongoose from 'mongoose';
import { UsersCollection } from '../models/userSchema.js';
import createHttpError from 'http-errors';

export const updateUserService = async (userId, payload) => {
  if (!mongoose.isValidObjectId(userId)) {
    throw createHttpError(400, 'Invalid user ID');
  }

  if (!payload || Object.keys(payload).length === 0) {
    throw createHttpError(400, 'No data provided for update');
  }

  const updatedUser = await UsersCollection.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    throw createHttpError(404, 'User not found');
  }

  return updatedUser;
};

export const addAdvertToUserService = async (userId, advertId) => {
  if (!mongoose.isValidObjectId(userId)) {
    throw createHttpError(400, 'Invalid user ID');
  }
  if (!mongoose.isValidObjectId(advertId)) {
    throw createHttpError(400, 'Invalid advert ID');
  }

  const updatedUser = await UsersCollection.findByIdAndUpdate(
    userId,
    { $push: { ads: advertId } },
    { new: true },
  );
  return updatedUser;
};
export const addAdvertToFavService = async (userId, advertId) => {
  if (!mongoose.isValidObjectId(userId)) {
    throw createHttpError(400, 'Invalid user ID');
  }
  if (!mongoose.isValidObjectId(advertId)) {
    throw createHttpError(400, 'Invalid advert ID');
  }

  const updatedUser = await UsersCollection.findByIdAndUpdate(
    userId,
    { $push: { favAds: advertId } },
    { new: true },
  );
  return updatedUser;
};

export const getUserContactsService = async (userId) => {
  if (!mongoose.isValidObjectId(userId)) {
    throw createHttpError(400, 'Invalid user ID');
  }

  const userContacts = await UsersCollection.findById(
    userId,
    'phone messengers',
  );

  if (!userContacts) {
    throw createHttpError(404, 'User not found');
  }

  return userContacts;
};
