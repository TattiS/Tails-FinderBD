import { Router } from 'express';
import advertsRouter from './adverts.js';
import authRouter from './auth.js';
import usersRouter from './users.js';
import filtersRouter from './filters.js';

const router = Router();

router.use('/adverts', advertsRouter);
router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/filters', filtersRouter);

export default router;
