const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    maxHttpBufferSize: 1e7, // 10 MB
    cors: {
        origin: "*", // Allow any origin for deployment simplicity
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // Store user info
    const clientIp = socket.handshake.address;
    socket.ip = clientIp; // Store on socket object for easy access
    console.log(`User Connected: ${socket.id} (IP: ${clientIp})`);

    socket.on("register_user", (username) => {
        socket.username = username;
    });

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    // WiFi Discovery Logic
    socket.on("find_nearby", () => {
        const nearbyUsers = [];
        const connectedSockets = io.sockets.sockets;

        for (const [id, s] of connectedSockets) {
            // Check if same IP but different socket ID and has a username
            if (s.ip === socket.ip && id !== socket.id && s.username) {
                nearbyUsers.push({
                    id: id,
                    username: s.username
                });
            }
        }

        socket.emit("nearby_found", nearbyUsers);
    });

    socket.on("connect_peer", (data) => {
        // data: { targetId, room }

        // 1. Force TARGET to join room
        const targetSocket = io.sockets.sockets.get(data.targetId);
        if (targetSocket) {
            targetSocket.join(data.room);
            targetSocket.emit("force_join", data.room);
        }

        // 2. Join SENDER to room
        socket.join(data.room);
        socket.emit("room_joined", data.room);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    // File transfer event
    socket.on("send_file", (data) => {
        // data: { room, file, fileName, type, username }
        socket.to(data.room).emit("receive_file", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

const PORT = process.env.PORT || 3001;

// Deployment: Serve static files
const path = require('path');
app.use(express.static(path.join(__dirname, '../client/dist')));

// Fallback for SPA (Single Page Application)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

server.listen(PORT, () => {
    console.log(`SERVER RUNNING on port ${PORT}`);
});
