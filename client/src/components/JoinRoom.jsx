import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function JoinRoom({ username, joinRoom }) {
    const [roomId, setRoomId] = useState('');

    const createRoom = () => {
        const id = uuidv4().slice(0, 8);
        joinRoom(id);
    };

    const handleJoin = () => {
        if (roomId.trim()) {
            joinRoom(roomId);
        }
    };

    return (
        <div className="screen">
            <h2>Welcome, {username}!</h2>
            <div style={{ margin: '20px 0' }}>
                <button onClick={createRoom} style={{ width: '100%', marginBottom: '10px' }}>Create New Room</button>
                <p>OR</p>
                <input
                    type="text"
                    placeholder="Enter Room Code"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                />
                <button onClick={handleJoin} disabled={!roomId.trim()}>Join Room</button>
            </div>
        </div>
    );
}

export default JoinRoom;
