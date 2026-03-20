import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import FileTransferZone from './FileTransferZone';
import { X } from 'lucide-react';

const ChatContainer = ({ roomId, users, messages, currentUsername, onSendMessage, onFileShared, onLeave }) => {
    const [showTransferZone, setShowTransferZone] = useState(false);

    const handleFileSharedProxy = (fileData) => {
        onFileShared(fileData);
        setShowTransferZone(false);
    };

    return (
        <div className="animate-fade-in" style={{ 
            display: 'flex', 
            height: '85vh', 
            width: '95vw', 
            maxWidth: '1200px', 
            gap: '20px'
        }}>
            <Sidebar roomId={roomId} users={users} />
            
            <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Real-time Transfer</h2>
                        <span style={{ fontSize: '0.75rem', color: '#10B981' }}>● Connected</span>
                    </div>
                    <button onClick={onLeave} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                        Leave Room
                    </button>
                </div>

                <MessageList messages={messages} currentUsername={currentUsername} />

                {showTransferZone && (
                    <div className="animate-fade-in" style={{ 
                        position: 'absolute', 
                        top: 0, left: 0, right: 0, bottom: 0, 
                        background: 'rgba(15, 23, 42, 0.9)', 
                        backdropFilter: 'blur(8px)',
                        zIndex: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '40px'
                    }}>
                        <button 
                            onClick={() => setShowTransferZone(false)}
                            style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                        >
                            <X size={24} />
                        </button>
                        <div style={{ width: '100%', maxWidth: '500px' }}>
                            <FileTransferZone onFileShared={handleFileSharedProxy} />
                        </div>
                    </div>
                )}

                <MessageInput 
                    onSendMessage={(text) => onSendMessage(text)} 
                    onFileSelect={() => setShowTransferZone(true)} 
                />
            </div>
        </div>
    );
};

export default ChatContainer;
