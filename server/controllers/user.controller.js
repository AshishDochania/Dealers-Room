import User from '../models/User.models.js';

export const getAllSellers = async (req, res) => {
  try {
    const sellers = await User.find({ role: 'seller' }, 'name _id email');
    res.status(200).json(sellers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
