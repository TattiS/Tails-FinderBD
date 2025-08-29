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
  app.use(cors({ origin: '*' }));
  app.use(pino({ transport: { target: 'pino-pretty' } }));
  app.use(express.json());
  app.use(cookieParser());

  // Swagger
  app.use('/api-docs', swaggerDocs());

  // Routes
  app.use('/api', router);

  // Error handling
  app.use(notFoundHandler);
  app.use(errorHandler);

  // Запуск сервера
  app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`Server is running on port ${PORT}`);
  });
};
