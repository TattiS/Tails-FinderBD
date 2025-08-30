import Joi from 'joi';

export const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  email: Joi.string().email().max(128).optional(),
  phone: Joi.string().allow('').optional(),
  messengers: Joi.array().items(Joi.string()).optional(),
  password: Joi.string().min(8).max(128).optional(),
  notificationsAllowed: Joi.boolean().optional(),
})
  .min(1)
  .messages({
    'object.min': 'Please provide at least one field to update',
  });
