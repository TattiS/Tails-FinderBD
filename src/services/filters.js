import { Advert } from '../models/advertSchema.js';

export const getFilterOptionsService = async () => {
  const species = await Advert.distinct('animal.species');
  const colors = await Advert.distinct('animal.colors');
  const sex = await Advert.distinct('animal.sex');
  const size = await Advert.distinct('animal.size');
  const status = await Advert.distinct('status');
  const cities = await Advert.distinct('context.location.city');

  return {
    species,
    colors,
    sex,
    size,
    status,
    cities,
  };
};
