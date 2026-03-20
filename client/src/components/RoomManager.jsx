import React, { useState } from 'react';
import { Plus, LogIn, ArrowLeft } from 'lucide-react';
import RoomActionCard from './RoomActionCard';

const RoomManager = ({ onJoinRoom, onBack, username }) => {
    const [isJoining, setIsJoining] = useState(false);
    const [roomIdInput, setRoomIdInput] = useState('');

    const generateRoomId = () => {
        const id = Math.random().toString(36).substring(2, 9).toUpperCase();
        onJoinRoom(id);
    };

    const handleJoinSubmit = (e) => {
        e.preventDefault();
        if (roomIdInput.trim()) {
            onJoinRoom(roomIdInput.trim().toUpperCase());
        }
    };

    if (isJoining) {
        return (
            <div className="glass-card animate-fade-in" style={{ padding: '40px', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                <button onClick={() => setIsJoining(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '24px' }}>
                    <ArrowLeft size={16} /> Back
                </button>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Join a Room</h2>
                <form onSubmit={handleJoinSubmit}>
                    <input 
                        className="input-field" 
                        placeholder="Enter Room ID" 
                        value={roomIdInput}
                        onChange={(e) => setRoomIdInput(e.target.value)}
                        style={{ marginBottom: '16px', textAlign: 'center', letterSpacing: '2px', fontSize: '1.2rem' }}
                        required
                    />
                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>Join Now</button>
                </form>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', width: '100%' }}>
            <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '8px' }}>Welcome, {username}!</h2>
                <p style={{ color: 'var(--text-muted)' }}>Choose an option to get started</p>
            </div>
            
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <RoomActionCard 
                    icon={Plus} 
                    title="Create Room" 
                    description="Generate a unique room ID and invite others to share files."
                    color="#4F46E5"
                    onClick={generateRoomId}
                />
                <RoomActionCard 
                    icon={LogIn} 
                    title="Join Room" 
                    description="Enter an existing room ID to connect with your friends."
                    color="#10B981"
                    onClick={() => setIsJoining(true)}
                />
            </div>

            <button onClick={onBack} className="btn-secondary">
                Change Username
            </button>
        </div>
    );
};

export default RoomManager;
