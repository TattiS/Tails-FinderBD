export const filesToBody = (req, res, next) => {
  try {
    if (req.files && req.files.length > 0) {
      req.body.photos = req.files.map((file) => ({
        originalname: file.originalname,
        mimetype: file.mimetype,
        path: file.path,
        size: file.size,
      }));
    }
    next();
  } catch (err) {
    console.error('filesToBody middleware error:', err.message);
    res.status(400).json({ message: 'Invalid request format' });
  }
};
