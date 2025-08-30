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
