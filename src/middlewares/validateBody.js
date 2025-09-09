import createHttpError from 'http-errors';

export const validateBody =
  (schema, options = {}) =>
  async (req, res, next) => {
    try {
      // Автоматично парсимо JSON-поля у req.body, якщо вони прийшли як рядки
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

      // Валідація через Joi
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
