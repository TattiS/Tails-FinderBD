import { Schema, model } from 'mongoose';

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
        enum: [
          'Кішка',
          'Собака',
          'Кролик',
          'Хом’як',
          'Морська свинка',
          'Шиншила',
          'Тхір',
          'Папуга',
          'Канарка',
          'Черепаха',
          'Ящірка',
          'Змія',
          'Інше',
        ],
        required: true,
      },
      breed: { type: String },
      colors: [
        {
          type: String,
          enum: [
            'Білий',
            'Рудий',
            'Сірий',
            'Коричневий',
            'Бежевий',
            'Кремовий',
            'Шоколадний',
            'Чорний',
            'Золотистий',
            'Пісочний',
            'Сріблястий',
            'Блакитний',
            'Жовтий',
            'Оранжевий',
            'Зелений',
            'Фіолетовий',
            'Смугастий (таббі)',
            'Тигровий',
            'Плямистий',
            'Чорно-білий',
            'Сіро-білий',
            'Рудо-білий',
            'Коричнево-білий',
            'Триколірний (чорний + рудий + білий)',
            'Черепаховий (чорний + рудий перемішані)',
            'Мармуровий',
            'Димчастий',
            'Інше',
          ],
          required: true,
        },
      ],
      sex: {
        type: String,
        enum: ['male', 'female', 'unknown'],
        default: 'unknown',
      },
      age: { type: String },
      size: {
        type: String,
        enum: ['small', 'medium', 'large', 'unknown'],
        default: 'unknown',
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
