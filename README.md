# 🛍️ Dealers Room

A real-time platform for buyers and sellers to create, accept, and manage business deals — featuring in-app messaging, file sharing, and status tracking.

Live Demo 👉 [Frontend](https://glittering-faun-4f98bc.netlify.app/) | [Backend](https://dealers-room.onrender.com)

Seller usercredential -- email-ash@gmail.com , password- ash@gmail

buyer usercredentials -- email- proper@gmail.com, password- proper@gmail
---

## 🚀 Features

- 🔐 Role-based login for Buyers and Sellers
- 📄 Buyers can create deals and assign sellers
- ✅ Sellers can accept or reject deals
- 💬 Real-time chat with socket.io
- 📎 Secure file upload for each deal (Cloudinary)
- 🧠 Redis-optimized backend for fast access
- 📱 Fully responsive and mobile-friendly

---

## 🛠️ Tech Stack

### Frontend
- **ReactJS**
- **Redux Toolkit + RTK Query**
- **Tailwind CSS**
- **Socket.io Client**
- **Axios**

### Backend
- **Node.js + Express**
- **MongoDB + Mongoose**
- **Cloudinary for file storage**
- **Redis (ioredis) for optimization**
- **Socket.io (WebSockets)**

---

## 📸 Screenshots

> ⚠️ Add your screenshots here  
Example:
Here are the screenshots of Login page, register page, seller's dashboard and buyer's dashboard
![Screenshot 2025-06-23 214050](https://github.com/user-attachments/assets/cf91ac89-81ca-4f4b-83fc-716eb056c87e)
![Screenshot 2025-06-23 214124](https://github.com/user-attachments/assets/4645ec63-1f3c-41a5-bb4a-a478aba49588)
![Screenshot 2025-06-23 214240](https://github.com/user-attachments/assets/2f5aadf4-0696-4881-99b6-0b792ab81de0)
![Screenshot 2025-06-23 214335](https://github.com/user-attachments/assets/1ce7fa53-317b-49ad-9619-b2237eb4dfb6)


---

## ⚙️ Setup Instructions

### 🔧 Backend

```bash
git clone https://github.com/your-username/dealers-room.git
cd dealers-room/server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in: MONGO_URI, REDIS configs, JWT_SECRET, CLOUDINARY creds

# Run server
npm start
```

### 🔧 Frontend
```bash
cd ../client

# Install dependencies
npm install

# Set up .env file
cp .env.example .env
# Add: VITE_BASE_URL, VITE_SOCKET_URL

# Start frontend
npm run dev
```

Backend env's
PORT=5000
MONGO_URI=<your-mongo-uri>
JWT_SECRET=supersecretkey
REDIS_HOST=...
REDIS_PORT=...
REDIS_PASSWORD=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...


frontend env's
VITE_BASE_URL=https://dealers-room.onrender.com
VITE_SOCKET_URL=https://dealers-room.onrender.com





