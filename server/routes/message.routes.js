import express from 'express';
import { sendMessage, getMessages } from '../controllers/message.controller.js';
import { protect } from '../middlewares/auth.middlewares.js';

const router = express.Router();

router.post('/', protect, sendMessage);
router.get('/:dealId', protect, getMessages);

export default router;
