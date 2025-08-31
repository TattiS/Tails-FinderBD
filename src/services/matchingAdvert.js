import { Advert } from '../models/advertSchema.js';

export const findMatchingAdvertsService = async (advert) => {
  const oppositeType = advert.status === 'lost' ? 'found' : 'lost';

  if (!advert.context?.location?.coordinates?.coordinates) {
    return []; // якщо немає координат — пошук неможливий
  }

  const [longitude, latitude] = advert.context.location.coordinates.coordinates;

  // Знаходимо потенційні збіги за базовими критеріями
  const potentialMatches = await Advert.find({
    status: oppositeType,
    'animal.species': advert.animal.species,
    'animal.colors': { $in: advert.animal.colors },
    archived: false,
    _id: { $ne: advert._id },
    location: {
      $nearSphere: {
        $geometry: { type: 'Point', coordinates: [longitude, latitude] },
        $maxDistance: 3000, // 3 км
      },
    },
  }).populate('user', 'name email notificationsAllowed');

  if (!advert.tags || advert.tags.length === 0) {
    return potentialMatches;
  }

  const matchesWithScore = potentialMatches.map((match) => {
    const commonTags = match.tags.filter((tag) => advert.tags.includes(tag));
    return {
      advert: match,
      score: commonTags.length,
    };
  });

  matchesWithScore.sort((a, b) => b.score - a.score);

  return matchesWithScore.map((item) => item.advert);
};
