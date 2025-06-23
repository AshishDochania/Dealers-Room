import Deal from '../models/Deal.models.js';
import { io } from '../socket.js';

export const createDeal = async (req, res) => {
  const { title, description, price, sellerId } = req.body;
  const buyerId = req.user.id;

  const deal = await Deal.create({ title, description, price, buyer: buyerId, seller: sellerId });

  // Emit real-time event to seller
  io.to(sellerId).emit('new-deal', deal);

  res.status(201).json(deal);
};

export const getUserDeals = async (req, res) => {
  const userId = req.user.id;
  const deals = await Deal.find({ $or: [{ buyer: userId }, { seller: userId }] })
                          .populate('buyer seller', 'name email role');
  res.json(deals);
};

export const updateDealStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const deal = await Deal.findByIdAndUpdate(id, { status }, { new: true });
  if (!deal) return res.status(404).json({ msg: 'Deal not found' });

  // Notify buyer and seller
  io.to(deal.buyer.toString()).emit('deal-updated', deal);
  io.to(deal.seller.toString()).emit('deal-updated', deal);

  res.json(deal);
};
