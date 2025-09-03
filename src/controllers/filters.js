import { getFilterOptionsService } from '../services/filters.js';
import { parseAdvertFilterParams } from '../utils/parseAdvertFilterParams.js';

export const getFiltersController = async (req, res) => {
  const filter = parseAdvertFilterParams(req.query);

  if (filter.archived === undefined) {
    filter.archived = false;
  }
  const filters = await getFilterOptionsService(filter);

  res.status(200).json({
    status: 200,
    data: filters,
  });
};
