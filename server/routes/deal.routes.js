import express from 'express';
import { createDeal, getUserDeals, updateDealStatus } from '../controllers/deal.controller.js';
import { protect } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post('/', protect, createDeal);          // Create new deal
router.get('/', protect, getUserDeals);         // Get all deals for logged-in user
router.patch('/:id', protect, updateDealStatus); // Update status (accept/reject/etc)

export default router;
