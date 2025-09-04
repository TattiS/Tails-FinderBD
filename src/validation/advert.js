import Joi from 'joi';
import { SPECIES, COLORS, SEX, SIZE } from '../constants/animalEnums.js';

// // Для валідації координат GeoJSON при створенні нового оголошення
// const coordinatesSchema = Joi.object({
//   type: Joi.string().valid('Point').required(),
//   coordinates: Joi.array().items(Joi.number().required()).length(2).required(), // [lng, lat]
// });

// // Для валідації координат GeoJSON при оновленні оголошення
// const updateCoordinatesSchema = Joi.array()
//   .ordered(Joi.number().required(), Joi.number().required())
//   .length(2)
//   .required(); // [lng, lat];

// Для валідації при створенні нового оголошення
export const createAdvertSchema = Joi.object({
  photos: Joi.array().items(Joi.string().uri()).min(1).required(),
  tags: Joi.array().items(Joi.string()).optional(),
  status: Joi.string().valid('found', 'lost').required(),
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
    description: Joi.string().max(1000).allow(''),
  }).required(),
  user: Joi.string().hex().length(24).required(),
  archived: Joi.boolean().default(false),
});

// Для валідації при оновленні оголошення
export const updateAdvertSchema = Joi.object({
  photos: Joi.array().items(Joi.string().uri()).min(1).optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  status: Joi.string().valid('found', 'lost').optional(),
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
    description: Joi.string().max(1000).allow('').optional(),
  }).optional(),
  archived: Joi.boolean().optional(),
});
