export const assembleAnimalContext = (req, res, next) => {
  try {
    const { species, colors, sex, size, location, date, description } =
      req.body;
    if (!location || !Array.isArray(location) || location.length !== 2) {
      return res.status(400).json({ message: 'Location is required' });
    }
    req.body.user = req.user._id.toString();
    req.body.archived = false;
    req.body.tags = req.body.tags || [];

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
      breed: '',
      colors: Array.isArray(colors) ? Array.from(colors) : [colors],
      sex,
      size,
      features: '',
    };

    delete req.body.species;
    delete req.body.colors;
    delete req.body.sex;
    delete req.body.size;
    delete req.body.description;
    delete req.body.location;
    delete req.body.date;

    next();
  } catch (err) {
    next(err);
  }
};
