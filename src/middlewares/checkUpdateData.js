export const checkUpdateData = (req, res, next) => {
  if (!Object.keys(req.body).length && (!req.files || req.files.length === 0)) {
    return res.status(400).json({ message: 'No data provided for update' });
  }
  next();
};
