import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import { validateBody } from '../middlewares/validateBody.js';
import { checkUpdateData } from '../middlewares/checkUpdateData.js';
import { filesToBody } from '../middlewares/filesToBody.js';
import {
  assembleAnimalContext,
  assembleAnimalContextForUpdate,
} from '../middlewares/assembleAnimalContext.js';
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
  upload.array('photos', 4),
  filesToBody,
  assembleAnimalContext,
  validateBody(createAdvertSchema),
  ctrlWrapper(createAdvertController),
);

// PATCH оновити оголошення повністю
router.patch(
  '/:id',
  authenticate,
  upload.array('photos', 4),
  checkUpdateData,
  filesToBody,
  assembleAnimalContextForUpdate,
  validateBody(updateAdvertSchema, { optionalFields: ['animal', 'context'] }),
  ctrlWrapper(updateAdvertController),
);

export default router;
