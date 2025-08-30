import { SPECIES, COLORS, SEX, SIZE } from '../constants/animalEnums.js';

export const getEnumOptionsService = () => {
  return {
    species: SPECIES,
    colors: COLORS,
    sex: SEX,
    size: SIZE,
    status: ['found', 'lost'],
  };
};
