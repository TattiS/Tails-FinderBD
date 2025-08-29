import Joi from 'joi';

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
    species: Joi.string().required(),
    breed: Joi.string().allow(''),
    colors: Joi.array()
      .items(Joi.string().valid('red', 'green', 'blue', 'other'))
      .min(1)
      .required(),
    sex: Joi.string().valid('male', 'female', 'unknown').default('unknown'),
    age: Joi.string().allow(''),
    size: Joi.string()
      .valid('small', 'medium', 'large', 'unknown')
      .default('unknown'),
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
  photos: Joi.array().items(Joi.string().uri()).min(1),
  status: Joi.string().valid('found', 'lost'),
  animal: Joi.object({
    species: Joi.string(),
    breed: Joi.string().allow(''),
    colors: Joi.array().items(
      Joi.string().valid('red', 'green', 'blue', 'other'),
    ),
    sex: Joi.string().valid('male', 'female', 'unknown'),
    age: Joi.string().allow(''),
    size: Joi.string().valid('small', 'medium', 'large', 'unknown'),
    features: Joi.string().allow(''),
  }),
  context: Joi.object({
    location: Joi.object({
      coordinates: updateCoordinatesSchema,
      city: Joi.string(),
      district: Joi.string().allow(''),
      address: Joi.string().allow(''),
    }),
    date: Joi.date(),
    description: Joi.string().allow(''),
  }),
  archived: Joi.boolean(),
});
