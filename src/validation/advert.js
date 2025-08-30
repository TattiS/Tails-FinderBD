import Joi from 'joi';
import { SPECIES, COLORS, SEX, SIZE } from '../constants/animalEnums.js';

// Для валідації координат GeoJSON при створенні нового оголошення
const coordinatesSchema = Joi.object({
  type: Joi.string().valid('Point').required(),
  coordinates: Joi.array().items(Joi.number().required()).length(2).required(), // [lng, lat]
});

// Для валідації координат GeoJSON при оновленні оголошення
const updateCoordinatesSchema = Joi.object({
  type: Joi.string().valid('Point').required(),
  coordinates: Joi.array().items(Joi.number()).length(2).required(),
});

// Для валідації при створенні нового оголошення
export const createAdvertSchema = Joi.object({
  photos: Joi.array().items(Joi.string().uri()).min(1).required(),
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
    age: Joi.string().allow(''),
    size: Joi.string()
      .valid(...SIZE)
      .default('інше'),
    features: Joi.string().allow(''),
  }).required(),
  context: Joi.object({
    location: Joi.object({
      coordinates: coordinatesSchema,
      city: Joi.string().required(),
      district: Joi.string().allow(''),
      address: Joi.string().allow(''),
    }).required(),
    date: Joi.date().required(),
    description: Joi.string().allow(''),
  }).required(),
  user: Joi.string().hex().length(24).required(),
  archived: Joi.boolean().default(false),
});

// Для валідації при оновленні оголошення
export const updateAdvertSchema = Joi.object({
  photos: Joi.array().items(Joi.string().uri()).min(1).optional(),
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
    age: Joi.string().allow('').optional(),
    size: Joi.string()
      .valid(...SIZE)
      .optional(),
    features: Joi.string().allow('').optional(),
  }).optional(),
  context: Joi.object({
    location: Joi.object({
      coordinates: updateCoordinatesSchema.optional(),
      city: Joi.string().optional(),
      district: Joi.string().allow('').optional(),
      address: Joi.string().allow('').optional(),
    }).optional(),
    date: Joi.date().optional(),
    description: Joi.string().allow('').optional(),
  }).optional(),
  archived: Joi.boolean().optional(),
});
