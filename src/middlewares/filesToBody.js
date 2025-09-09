export const filesToBody = (req, res, next) => {
  if (req.files && req.files.length > 0) {
    req.body.photos = req.files.map((file) => ({
      originalname: file.originalname,
      mimetype: file.mimetype,
      path: file.path,
      size: file.size,
    }));
  }
  next();
};
