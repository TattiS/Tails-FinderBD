import Joi from 'joi';
import {
  SPECIES,
  COLORS,
  SEX,
  SIZE,
  STATUS,
} from '../constants/animalEnums.js';

export const createAdvertSchema = Joi.object({
  tags: Joi.array().items(Joi.string()).optional(),
  status: Joi.string()
    .valid(...STATUS)
    .required(),
  animal: Joi.object({
    species: Joi.string()
      .valid(...SPECIES)
      .required(),
    breed: Joi.string().allow('').optional(),
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
    features: Joi.string().allow('').optional(),
  }).required(),
  context: Joi.object({
    location: Joi.object({
      type: Joi.string().valid('Point').default('Point'),
      coordinates: Joi.array()
        .ordered(Joi.number().required(), Joi.number().required())
        .length(2)
        .required(),
      city: Joi.string().allow('').optional(),
      district: Joi.string().allow('').optional(),
      address: Joi.string().allow('').optional(),
    }).required(),
    date: Joi.date().required(),
    description: Joi.string().max(2048).allow('').optional(),
  }).required(),
  user: Joi.string().hex().length(24).required(),
  archived: Joi.boolean().default(false),
});

// Для валідації при оновленні оголошення
export const updateAdvertSchema = Joi.object({
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
