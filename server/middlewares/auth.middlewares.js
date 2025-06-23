import jwt from 'jsonwebtoken';
import Redis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  tls: {}, // ✅ include this ONLY if you're using a secure Redis (Upstash, etc.)
});

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
