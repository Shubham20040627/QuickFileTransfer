import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import Welcome from './components/Welcome'
import JoinRoom from './components/JoinRoom'
import Chat from './components/Chat'
import './index.css'

// Connect to the same origin (works for both local and deployed if served together)
const socket = io();

function App() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [screen, setScreen] = useState("welcome"); // welcome, room, chat

    const joinRoom = (roomId) => {
        if (username !== "" && roomId !== "") {
            socket.emit("join_room", roomId);
            // Also register username in case it wasn't valid before
            socket.emit("register_user", username);
            setRoom(roomId);
            setScreen("chat");
        }
    };

    // Auto-join handling for WiFi discovery
    useEffect(() => {
        socket.on("force_join", (roomId) => {
            setRoom(roomId);
            setScreen("chat");
        });

        socket.on("room_joined", (roomId) => {
            setRoom(roomId);
            setScreen("chat");
        });

        return () => {
            socket.off("force_join");
            socket.off("room_joined");
        };
    }, []);

    // Register username whenever it's set in Welcome screen
    useEffect(() => {
        if (username) {
            socket.emit("register_user", username);
        }
    }, [username]);

    const leaveRoom = () => {
        setRoom("");
        setScreen("welcome"); // Go back to welcome screen, not 'room'
        // Optional: emit leave event
    };

    return (
        <div className="app-container">
            {screen === 'welcome' && (
                <Welcome setUsername={setUsername} setScreen={setScreen} socket={socket} />
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
