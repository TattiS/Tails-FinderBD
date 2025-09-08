import {
  SPECIES,
  COLORS,
  SEX,
  SIZE,
  STATUS,
} from '../constants/animalEnums.js';

export const getEnumOptionsService = () => {
  return {
    species: SPECIES,
    colors: COLORS,
    sex: SEX,
    size: SIZE,
    status: STATUS,
  };
};
