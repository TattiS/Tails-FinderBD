import { Advert } from '../models/advertSchema.js';

export const getFilterOptionsService = async (filter = {}) => {
  const cities = await Advert.distinct('context.location.city', filter);
  const districts = await Advert.distinct('context.location.district', filter);
  const species = await Advert.distinct('animal.species', filter);
  const statuses = await Advert.distinct('status', filter);

  return {
    cities,
    districts,
    species,
    statuses,
  };
};
