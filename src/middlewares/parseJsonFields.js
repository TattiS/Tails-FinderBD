export const parseJsonFields =
  (fields = []) =>
  (req, res, next) => {
    try {
      fields.forEach((field) => {
        const value = req.body[field];
        if (typeof value === 'string') {
          try {
            req.body[field] = JSON.parse(value);
          } catch (e) {
            console.error(`Failed to parse field "${field}":`, e.message);

            return res.status(400).json({
              message: `Invalid JSON format in field "${field}"`,
            });
          }
        }
      });
      next();
    } catch (err) {
      console.error('parseJsonFields middleware error:', err.message);
      res.status(400).json({ message: 'Invalid request format' });
    }
  };
