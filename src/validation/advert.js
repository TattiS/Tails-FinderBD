import Joi from 'joi';
import {
  SPECIES,
  COLORS,
  SEX,
  SIZE,
  STATUS,
} from '../constants/animalEnums.js';

export const createAdvertSchema = Joi.object({
  photos: Joi.array()
    .items(
      Joi.object({
        originalname: Joi.string().required(),
        mimetype: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().required(),
      }),
    )
    .min(1)
    .max(4)
    .required()
    .messages({
      'array.min': 'Додайте хоча б одне фото',
      'array.max': 'Максимум 4 фото',
      'any.required': 'Додайте фото',
    }),
  tags: Joi.array().items(Joi.string()).optional(),
  status: Joi.string()
    .valid(...STATUS)
    .required(),
  animal: Joi.object({
    species: Joi.string()
      .valid(...SPECIES)
      .required(),
    breed: Joi.string().allow(''),
    colors: Joi.array()
      .items(Joi.string().valid(...COLORS))
      .min(1)
      .required(),
    sex: Joi.string()
      .valid(...SEX)
      .default('інше'),
    size: Joi.string()
      .valid(...SIZE)
      .default('інше'),
    features: Joi.string().allow(''),
  }).required(),
  context: Joi.object({
    location: Joi.object({
      type: Joi.string().valid('Point').default('Point'),
      coordinates: Joi.array()
        .ordered(Joi.number().required(), Joi.number().required())
        .length(2)
        .required(),
      city: Joi.string().optional(),
      district: Joi.string().allow('').optional(),
      address: Joi.string().allow('').optional(),
    }).required(),
    date: Joi.date().required(),
    description: Joi.string().max(2048).allow(''),
  }).required(),
  user: Joi.string().hex().length(24).required(),
  archived: Joi.boolean().default(false),
});

// Для валідації при оновленні оголошення
export const updateAdvertSchema = Joi.object({
  photos: Joi.array()
    .items(
      Joi.object({
        originalname: Joi.string().required(),
        mimetype: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().required(),
      }),
    )
    .min(1)
    .max(4)
    .optional()
    .messages({
      'array.min': 'Додайте хоча б одне фото',
      'array.max': 'Максимум 4 фото',
    }),
  tags: Joi.array().items(Joi.string()).optional(),
  status: Joi.string()
    .valid(...STATUS)
    .optional(),
  animal: Joi.object({
    species: Joi.string()
      .valid(...SPECIES)
      .optional(),
    breed: Joi.string().allow('').optional(),
    colors: Joi.array()
      .items(Joi.string().valid(...COLORS))
      .optional(),
    sex: Joi.string()
      .valid(...SEX)
      .optional(),
    size: Joi.string()
      .valid(...SIZE)
      .optional(),
    features: Joi.string().allow('').optional(),
  }).optional(),
  context: Joi.object({
    location: Joi.object({
      type: Joi.string().valid('Point').default('Point'),
      coordinates: Joi.array()
        .ordered(Joi.number(), Joi.number()) // [lng, lat]
        .length(2)
        .optional(),
    }).optional(),
    date: Joi.date().optional(),
    description: Joi.string().max(2048).allow('').optional(),
  }).optional(),
  archived: Joi.boolean().optional(),
});
