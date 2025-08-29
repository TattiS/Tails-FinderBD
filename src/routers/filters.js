import { Router } from 'express';
import { getFiltersController } from '../controllers/filters.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

// GET /filters
router.get('/', ctrlWrapper(getFiltersController));

export default router;
