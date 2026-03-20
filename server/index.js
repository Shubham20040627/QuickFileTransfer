const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

// Health check endpoint for Render
app.get('/health', (req, res) => {
    res.status(200).send('Server is healthy');
});

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
    maxHttpBufferSize: 1e8 // 100MB for file transfers
});

// In-memory room management
const rooms = new Map();

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('join-room', ({ roomId, username }) => {
        socket.join(roomId);
        
        if (!rooms.has(roomId)) {
            rooms.set(roomId, new Set());
        }
        
        rooms.get(roomId).add({ id: socket.id, username });
        
        const usersInRoom = Array.from(rooms.get(roomId));
        io.to(roomId).emit('room-users', usersInRoom);
        
        console.log(`${username} joined room: ${roomId}`);

        // System message
        io.to(roomId).emit('message', {
            id: Date.now(),
            username: 'System',
            text: `${username} has joined the room.`,
            type: 'system'
        });
    });

    socket.on('send-message', ({ roomId, message }) => {
        io.to(roomId).emit('message', {
            id: Date.now(),
            ...message
        });
    });

    socket.on('send-file', ({ roomId, fileData }) => {
        // fileData: { name, type, size, content, sender }
        io.to(roomId).emit('file-received', {
            id: Date.now(),
            ...fileData
        });
    });

    socket.on('disconnect', () => {
        rooms.forEach((users, roomId) => {
            const user = Array.from(users).find(u => u.id === socket.id);
            if (user) {
                users.delete(user);
                io.to(roomId).emit('room-users', Array.from(users));
                io.to(roomId).emit('message', {
                    id: Date.now(),
                    username: 'System',
                    text: `${user.username} has left the room.`,
                    type: 'system'
                });
            }
        });
        console.log(`User disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
