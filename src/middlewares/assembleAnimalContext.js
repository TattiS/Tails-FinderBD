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

    if (location && location.lat !== undefined && location.lng !== undefined) {
      req.body.context = {
        location: {
          type: 'Point',
          coordinates: [location.lng, location.lat],
          city: city || undefined,
          district: district || '',
          address: address || '',
        },
        date: date ? new Date(date) : new Date(),
        description: description || '',
      };
    } else {
      return res.status(400).json({ message: 'Location is required' });
    }

    next();
  } catch (err) {
    console.error('assembleAnimalContext error:', err.message);
    res.status(400).json({ message: 'Invalid request data' });
  }
};
