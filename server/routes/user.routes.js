import express from 'express';
import { getAllSellers } from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middlewares.js';

const router = express.Router();

router.get('/sellers', protect, getAllSellers);

export default router;
