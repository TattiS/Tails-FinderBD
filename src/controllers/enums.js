import { getEnumOptionsService } from '../services/enums.js';

// GET /enums
export const getEnumOptionsController = async (req, res) => {
  const enumOptions = getEnumOptionsService();

  res.status(200).json(enumOptions);
};
