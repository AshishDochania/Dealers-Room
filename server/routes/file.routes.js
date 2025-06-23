import express from 'express';
import upload from '../middlewares/upload.middlewares.js';
import { protect } from '../middlewares/auth.middlewares.js';
import { uploadFileController } from '../controllers/file.controller.js';

const router = express.Router();

router.post('/:dealId', protect, upload.single('file'), uploadFileController);

export default router;
