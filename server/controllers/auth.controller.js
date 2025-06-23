import User from '../models/User.models.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) return res.status(400).json({ msg: 'Missing fields' });

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ msg: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashedPassword, role });

  const token = generateToken(newUser._id);
  await redis.set(`session:${newUser._id}`, token);

  res.status(201).json({ token, user: { id: newUser._id, name, email, role } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  const token = generateToken(user._id);
  await redis.set(`session:${user._id}`, token);

  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};
