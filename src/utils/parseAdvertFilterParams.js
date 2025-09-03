const queryToFieldMap = {
  archived: { field: 'archived', type: 'boolean' },
  status: { field: 'status', type: 'string' },
  species: { field: 'animal.species', type: 'string' },
  city: { field: 'context.location.city', type: 'string' },
  district: { field: 'context.location.district', type: 'string' },
  // приклад розширення:
  // breed: { field: 'animal.breed', type: 'string' },
  // color: { field: 'animal.color', type: 'string' },
};

export const parseAdvertFilterParams = (query) => {
  const filter = {};

  for (const [param, config] of Object.entries(queryToFieldMap)) {
    if (query[param] !== undefined) {
      switch (config.type) {
        case 'boolean':
          filter[config.field] = query[param] === 'true';
          break;
        case 'number':
          filter[config.field] = Number(query[param]);
          break;
        case 'string':
        default:
          filter[config.field] = query[param];
      }
    }
  }

  return filter;
};
