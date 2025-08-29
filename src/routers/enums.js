import express from 'express';
import { getEnumOptionsController } from '../controllers/enums.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/', ctrlWrapper(getEnumOptionsController));

export default router;
