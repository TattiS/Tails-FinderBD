export const assembleAnimalContext = () => (req, res, next) => {
  try {
    const { species, colors, sex, size, location, date, description } =
      req.body;

    if (!location || !Array.isArray(location) || location.length !== 2) {
      return res.status(400).json({ message: 'Location is required' });
    }

    const [lng, lat] = location;

    req.body.context = {
      location: {
        type: 'Point',
        coordinates: [lng, lat],
        city: '',
        district: '',
        address: '',
      },
      date: date ? new Date(date) : new Date(),
      description: description || '',
    };

    req.body.animal = {
      species,
      colors,
      sex,
      size,
    };

    next();
  } catch (err) {
    next(err);
  }
};
