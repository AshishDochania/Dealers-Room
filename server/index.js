import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import dealRoutes from './routes/deal.routes.js';
import userRoutes from './routes/user.routes.js';
import messageRoutes from './routes/message.routes.js';
import mongoose from 'mongoose';
import http from 'http';

import { initSocket } from './socket.js';

dotenv.config();
const app = express();

const server = http.createServer(app);
initSocket(server);


app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => res.send('Server running...'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

app.use('/api/auth', authRoutes);
app.use('/api/deals', dealRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);


const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
