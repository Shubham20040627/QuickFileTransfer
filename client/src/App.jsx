import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import Welcome from './components/Welcome'
import JoinRoom from './components/JoinRoom'
import Chat from './components/Chat'
import './index.css'

// Use environment variable for production, or fallback to localhost/LAN IP
const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3001";
const socket = io.connect(SERVER_URL);

function App() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [screen, setScreen] = useState("welcome"); // welcome, room, chat

    const joinRoom = (roomId) => {
        if (username !== "" && roomId !== "") {
            socket.emit("join_room", roomId);
            setRoom(roomId);
            setScreen("chat");
        }
    };

    const leaveRoom = () => {
        setRoom("");
        setScreen("room");
        // Optional: emit leave event
    };

    return (
        <div className="app-container">
            {screen === 'welcome' && (
                <Welcome setUsername={setUsername} setScreen={setScreen} />
            )}
            {screen === 'room' && (
                <JoinRoom username={username} joinRoom={joinRoom} />
            )}
            {screen === 'chat' && (
                <Chat socket={socket} username={username} room={room} leaveRoom={leaveRoom} />
            )}
        </div>
    );
}

export default App
