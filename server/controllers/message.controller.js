import Message from '../models/Message.models.js';
import redis from '../config/redis.js';
import { io } from '../socket.js';

export const sendMessage = async (req, res) => {
  const { dealId, content } = req.body;
  const senderId = req.user.id;

  try {
    const message = await Message.create({ dealId, content, sender: senderId });

    // Emit message to deal participants (buyer + seller)
    io.to(dealId).emit('new-message', message);

    res.status(201).json(message);
  } catch (err) {
    console.error("Message error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMessages = async (req, res) => {
  const { dealId } = req.params;

  try {
    const cacheKey = `deal:${dealId}:messages`;

    // Check Redis first
    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.status(200).json(JSON.parse(cached));
    }

    const messages = await Message.find({ dealId })
    .populate('sender', 'name email role')  // 👈 shows who sent it
    .sort({ timestamp: 1 });

    // Save to Redis
    redis.set(cacheKey, JSON.stringify(messages), 'EX', 60);
    
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
};
