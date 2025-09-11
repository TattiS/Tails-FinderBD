import createHttpError from 'http-errors';

export const validateBody =
  (schema, options = {}) =>
  async (req, res, next) => {
    try {
      // Перетворення JSON-рядків у об'єкти
      for (const key in req.body) {
        if (typeof req.body[key] === 'string') {
          try {
            const parsed = JSON.parse(req.body[key]);
            req.body[key] = parsed;
          } catch {
            // Якщо не валідний JSON — залишаємо як рядок
          }
        }
      }

      await schema.validateAsync(req.body, { abortEarly: false, ...options });

      next();
    } catch (error) {
      const errors = error.details
        ? error.details.map((d) => d.message)
        : [error.message];
      next(
        createHttpError(400, {
          message: 'Validation failed',
          errors,
        }),
      );
    }
  };
