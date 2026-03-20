import React from 'react';
import { Users, Hash, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const Sidebar = ({ roomId, users }) => {
    const [copied, setCopied] = useState(false);

    const copyRoomId = () => {
        navigator.clipboard.writeText(roomId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="glass-card" style={{ height: '100%', width: '280px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid var(--glass-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '8px' }}>
                    <Hash size={14} /> ROOM ID
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.05)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                    <span style={{ fontWeight: '700', letterSpacing: '1px' }}>{roomId}</span>
                    <button onClick={copyRoomId} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                        {copied ? <Check size={16} color="#10B981" /> : <Copy size={16} />}
                    </button>
                </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '16px' }}>
                    <Users size={14} /> ONLINE USERS ({users.length})
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {users.map((user) => (
                        <div key={user.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                {user.username.charAt(0).toUpperCase()}
                            </div>
                            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{user.username}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
