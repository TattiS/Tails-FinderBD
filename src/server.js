import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { getEnvVar } from './utils/getEnvVar.js';
import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  // Middleware
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
  app.use(cors({ origin: '*' }));
  app.use(pino({ transport: { target: 'pino-pretty' } }));
  app.use(express.json({ limit: '10mb' })); // більший ліміт для великих запитів (наприклад, фото)
  app.use(cookieParser());

  // Swagger
  app.use('/api-docs', swaggerDocs());

  // Routes
  app.use('/api', router);

  // Error handling
  app.use(notFoundHandler);
  app.use(errorHandler);

  // Створюємо сервер вручну, щоб можна було задати таймаути
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });

  // Таймаути для Render та великих запитів
  server.keepAliveTimeout = 120000; // 120 секунд
  server.headersTimeout = 120000;

  return server;
};
