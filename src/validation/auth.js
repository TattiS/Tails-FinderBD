import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().max(16).required(),
  email: Joi.string().email().max(128).required(),
  password: Joi.string().min(8).max(128).required(),
  phone: Joi.string().allow('').optional(),
  notificationsAllowed: Joi.boolean().optional(),
  termsAccepted: Joi.boolean().valid(true).required().messages({
    'any.only': 'You must accept the terms to register',
  }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().max(128).required(),
  password: Joi.string().min(8).max(128).required(),
});
