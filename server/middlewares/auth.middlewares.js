import jwt from 'jsonwebtoken';
import redis from '../config/redis.js';

export const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const stored = await redis.get(`session:${decoded.id}`);
    if (stored !== token) return res.status(403).json({ msg: 'Invalid session' });

    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ msg: 'Token failed' });
  }
};
