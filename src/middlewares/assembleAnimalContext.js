export const assembleAnimalContext = (req, res, next) => {
  try {
    const {
      species,
      colors,
      sex,
      size,
      breed,
      features,
      location,
      date,
      description,
      city,
      district,
      address,
    } = req.body;

    req.body.animal = {
      species,
      colors,
      sex,
      size,
      breed: breed || '',
      features: features || '',
    };

    if (typeof location === 'string') {
      try {
        const locationJSON = JSON.parse(location);

        if (
          locationJSON &&
          locationJSON.lat !== undefined &&
          locationJSON.lng !== undefined
        ) {
          req.body.context = {
            location: {
              type: 'Point',
              coordinates: [location.lng, location.lat],
              city: city || '',
              district: district || '',
              address: address || '',
            },
            date: date ? new Date(date) : new Date(),
            description: description || '',
          };
        } else {
          return res.status(400).json({ message: 'Location is required' });
        }
      } catch (e) {
        console.warn('Не вдалося розпарсити location:', location);
        return res
          .status(400)
          .json({ message: `Invalid location format ${e.message}` });
      }
    }

    next();
  } catch (err) {
    console.error('assembleAnimalContext error:', err.message);
    res.status(400).json({ message: 'Invalid request data' });
  }
};

export const assembleAnimalContextForUpdate = (req, res, next) => {
  try {
    const {
      species,
      colors,
      sex,
      size,
      breed,
      features,
      location,
      date,
      description,
      city,
      district,
      address,
    } = req.body;

    if (species || colors || sex || size || breed || features) {
      req.body.animal = {
        ...(species !== undefined && { species }),
        ...(colors !== undefined && { colors }),
        ...(sex !== undefined && { sex }),
        ...(size !== undefined && { size }),
        ...(breed !== undefined && { breed }),
        ...(features !== undefined && { features }),
      };
    }

    if (location || date || description) {
      const context = {};

      if (
        location &&
        location.lat !== undefined &&
        location.lng !== undefined
      ) {
        context.location = {
          type: 'Point',
          coordinates: [location.lng, location.lat],
          city: city || undefined,
          district: district || '',
          address: address || '',
        };
      }

      if (date) context.date = new Date(date);
      if (description !== undefined) context.description = description;

      req.body.context = context;
    }

    next();
  } catch (err) {
    console.error('assembleAnimalContextForUpdate error:', err.message);
    res.status(400).json({ message: 'Invalid request data' });
  }
};
