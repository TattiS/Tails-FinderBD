import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateUserSchema } from '../validation/user.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getUserCurrentController,
  updateUserController,
} from '../controllers/user.js';

const router = Router();

router.get('/current', authenticate, ctrlWrapper(getUserCurrentController));
router.patch(
  '/:id',
  authenticate,
  validateBody(updateUserSchema),
  ctrlWrapper(updateUserController),
);

export default router;
