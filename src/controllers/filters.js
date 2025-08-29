import { getFilterOptionsService } from '../services/filters.js';

export const getFiltersController = async (req, res) => {
  const filters = await getFilterOptionsService();

  res.status(200).json({
    status: 200,
    data: filters,
  });
};
