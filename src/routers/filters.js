import { Router } from 'express';
import { getFiltersController } from '../controllers/filters.js';

const router = Router();

// GET /filters
router.get('/', getFiltersController);

export default router;
