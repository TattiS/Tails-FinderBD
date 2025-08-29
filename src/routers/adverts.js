import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createAdvertSchema,
  updateAdvertSchema,
} from '../validation/advert.js';
import {
  createAdvertController,
  updateAdvertController,
  getAdvertsController,
  getAdvertByIdController,
} from '../controllers/adverts.js';

const router = Router();

// GET всі оголошення
router.get('/', ctrlWrapper(getAdvertsController));

// GET одне оголошення за id
router.get('/:id', ctrlWrapper(getAdvertByIdController));

// POST створити нове оголошення
router.post(
  '/',
  authenticate,
  validateBody(createAdvertSchema),
  ctrlWrapper(createAdvertController),
);

// PATCH оновити оголошення повністю
router.patch(
  '/:id',
  authenticate,
  validateBody(updateAdvertSchema),
  ctrlWrapper(updateAdvertController),
);

export default router;
