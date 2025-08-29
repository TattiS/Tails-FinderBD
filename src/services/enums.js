import { Advert } from '../models/advertSchema.js';

export const getEnumOptionsService = () => {
  return {
    species: Advert.schema.path('animal.species').enumValues,
    colors: Advert.schema.path('animal.colors').caster.enumValues,
    sex: Advert.schema.path('animal.sex').enumValues,
    size: Advert.schema.path('animal.size').enumValues,
    status: Advert.schema.path('status').enumValues,
  };
};
