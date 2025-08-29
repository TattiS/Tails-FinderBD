import { Advert } from '../models/advertSchema.js';

export const findMatchingAdverts = async (advert) => {
  const oppositeType = advert.type === 'lost' ? 'found' : 'lost';

  if (!advert.location?.coordinates) {
    return []; // якщо немає координат — пошук неможливий
  }

  const [longitude, latitude] = advert.location.coordinates;

  const matchedAdverts = await Advert.find({
    type: oppositeType,
    species: advert.species,
    colors: { $in: advert.colors },
    _id: { $ne: advert._id }, // виключаємо саме це оголошення
    location: {
      $nearSphere: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
        $maxDistance: 15000, // 15 км
      },
    },
  }).populate('user', 'name email notificationsAllowed');

  return matchedAdverts;
};
