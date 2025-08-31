import { Router } from 'express';
import advertsRouter from './adverts.js';
import startRouter from './start.js';
import authRouter from './auth.js';
import usersRouter from './users.js';
import filtersRouter from './filters.js';
import enumsRouter from './enums.js';

const router = Router();

router.use('/adverts/start', startRouter);
router.use('/adverts', advertsRouter);
router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/filters', filtersRouter);
router.use('/enums', enumsRouter);

export default router;
