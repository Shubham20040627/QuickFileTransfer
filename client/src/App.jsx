import React, { useState, useEffect } from 'react';
import { socket, connectSocket, disconnectSocket } from './socket';
import AuthContainer from './components/AuthContainer';
import RoomManager from './components/RoomManager';
import ChatContainer from './components/ChatContainer';
import './components/SharedStyles.css';

function App() {
    const [step, setStep] = useState('auth'); // auth, room, chat
    const [username, setUsername] = useState('');
    const [roomId, setRoomId] = useState('');
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('room-users', (users) => {
            setUsers(users);
        });

        socket.on('message', (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        socket.on('file-received', (fileData) => {
            setMessages((prev) => [...prev, {
                id: fileData.id,
                username: fileData.sender,
                file: {
                    name: fileData.name,
                    type: fileData.type,
                    size: fileData.size,
                    content: fileData.content
                }
            }]);
        });

        return () => {
            socket.off('room-users');
            socket.off('message');
            socket.off('file-received');
        };
    }, []);

    const handleAuthContinue = (name) => {
        setUsername(name);
        setStep('room');
    };

    const handleJoinRoom = (id) => {
        setRoomId(id);
        connectSocket();
        socket.emit('join-room', { roomId: id, username });
        setStep('chat');
    };

    const handleSendMessage = (text) => {
        socket.emit('send-message', { 
            roomId, 
            message: { username, text } 
        });
    };

    const handleFileShared = (fileData) => {
        socket.emit('send-file', { 
            roomId, 
            fileData: { ...fileData, sender: username } 
        });
    };

    const handleLeave = () => {
        disconnectSocket();
        setStep('room');
        setMessages([]);
        setUsers([]);
        setRoomId('');
    };

    const handleBackToAuth = () => {
        setStep('auth');
        setUsername('');
    };

    return (
        <div className="flex-center" style={{ width: '100%', minHeight: '100vh', padding: '20px' }}>
            {step === 'auth' && <AuthContainer onContinue={handleAuthContinue} />}
            {step === 'room' && <RoomManager username={username} onJoinRoom={handleJoinRoom} onBack={handleBackToAuth} />}
            {step === 'chat' && (
                <ChatContainer 
                    roomId={roomId}
                    users={users}
                    messages={messages}
                    currentUsername={username}
                    onSendMessage={handleSendMessage}
                    onFileShared={handleFileShared}
                    onLeave={handleLeave}
                />
            )}
        </div>
    );
}

export default App;
