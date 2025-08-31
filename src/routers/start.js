import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getLatestAdvertsController } from '../controllers/adverts.js';

const router = Router();

// GET останні оголошення
router.get('/', ctrlWrapper(getLatestAdvertsController));

export default router;
