import { Schema, model } from 'mongoose';
import { SPECIES, COLORS, SEX, SIZE } from '../constants/animalEnums.js';

const advertSchema = new Schema(
  {
    photos: {
      type: [String], // масив URL (галерея фото)
      required: true,
      validate: [(val) => val.length > 0, 'At least one photo is required'],
    },
    status: {
      type: String,
      enum: ['found', 'lost'],
      required: true,
    },
    animal: {
      species: {
        type: String,
        enum: SPECIES,
        required: true,
      },
      breed: { type: String },
      colors: [
        {
          type: String,
          enum: COLORS,
          required: true,
        },
      ],
      sex: {
        type: String,
        enum: SEX,
        default: 'інше',
      },
      age: { type: String },
      size: {
        type: String,
        enum: SIZE,
        default: 'інше',
      },
      features: { type: String },
    },
    context: {
      location: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point',
        },
        coordinates: {
          type: [Number], // [lng, lat]
          index: '2dsphere',
          required: true,
        },
        city: { type: String, required: true },
        district: { type: String },
        address: { type: String },
      },
      date: { type: Date, required: true },
      description: { type: String, maxlength: 1000 },
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    archived: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

advertSchema.index({ location: '2dsphere' });

export const Advert = model('Advert', advertSchema);
