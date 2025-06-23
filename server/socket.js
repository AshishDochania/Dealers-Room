import { Server } from 'socket.io';
import redis from './config/redis.js';
let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL|| 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      redis.set(`user:${userId}:socket`, socket.id);
      redis.expire(`user:${userId}:socket`, 3600); // Join room for user ID
    }

    socket.on('join-room', (dealId) => {
      socket.join(dealId);
    });

    socket.on('leave-room', (dealId) => {
      socket.leave(dealId);
    });

    socket.on('disconnect', () => {
        if (userId) {
          redis.del(`user:${userId}:socket`);
        }
      console.log(`User ${userId} disconnected`);
    });
  });

  return io;
};

export { io };
