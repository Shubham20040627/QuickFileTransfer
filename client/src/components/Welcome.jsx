import React, { useState, useEffect } from 'react';

function Welcome({ setUsername, setScreen, socket }) {
    const [user, setUser] = useState('');
    const [nearbyUsers, setNearbyUsers] = useState([]);
    const [showNearby, setShowNearby] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        if (socket) {
            const handleNearbyFound = (users) => {
                setNearbyUsers(users);
                setIsSearching(false);
                setShowNearby(true);
            };

            socket.on("nearby_found", handleNearbyFound);

            return () => {
                socket.off("nearby_found", handleNearbyFound);
            };
        }
    }, [socket]);

    const handleJoin = () => {
        if (user.trim()) {
            setUsername(user);
            setScreen('room');
        }
    };

    const findPeers = () => {
        if (user.trim()) {
            setUsername(user);
            if (socket) {
                setIsSearching(true);
                socket.emit("register_user", user);
                socket.emit("find_nearby");
            }
        } else {
            alert("Please enter a username first!");
        }
    };

    const connectPeer = (targetId) => {
        const roomId = "wifi_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
        if (socket) {
            socket.emit("connect_peer", { targetId, room: roomId });
        }
    };

    return (
        <div className="screen">
            <h1>Sync Drop</h1>
            <p>Share messages and files securely in real-time.</p>
            <input
                type="text"
                placeholder="Enter your username..."
                value={user}
                onChange={(e) => setUser(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleJoin()}
            />
            <button onClick={handleJoin}>Get Started</button>

            <div style={{ marginTop: '20px', width: '100%', maxWidth: '300px' }}>
                <div style={{ height: '1px', background: '#ccc', margin: '20px 0' }}></div>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>OR</p>
                <button
                    onClick={findPeers}
                    style={{ background: '#10b981', width: '100%' }}
                >
                    {isSearching ? "Searching..." : "📍 Find People Nearby (WiFi)"}
                </button>

                {showNearby && (
                    <div className="nearby-list">
                        {nearbyUsers.length === 0 ? (
                            <p style={{ fontSize: '12px', marginTop: '10px', color: '#666' }}>No users found on same network.{'\n'}(Try opening another tab)</p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                {nearbyUsers.map(u => (
                                    <button
                                        key={u.id}
                                        onClick={() => connectPeer(u.id)}
                                        style={{
                                            background: 'white',
                                            color: '#333',
                                            border: '1px solid #ccc',
                                            padding: '8px',
                                            fontSize: '14px',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginTop: '5px'
                                        }}
                                    >
                                        <span>👤 {u.username}</span>
                                        <span style={{ fontSize: '10px', background: '#e5e7eb', padding: '2px 5px', borderRadius: '4px' }}>Connect</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Welcome;
