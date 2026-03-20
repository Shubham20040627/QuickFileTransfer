import React, { useEffect, useRef } from 'react';
import SharedFileItem from './SharedFileItem';

const MessageList = ({ messages, currentUsername }) => {
    const scrollRef = useRef();

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {messages.map((msg) => {
                if (msg.type === 'system') {
                    return (
                        <div key={msg.id} style={{ alignSelf: 'center', background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {msg.text}
                        </div>
                    );
                }

                if (msg.file) {
                    return <SharedFileItem key={msg.id} file={msg.file} isOwn={msg.username === currentUsername} sender={msg.username} />;
                }

                const isOwn = msg.username === currentUsername;

                return (
                    <div 
                        key={msg.id} 
                        style={{ 
                            alignSelf: isOwn ? 'flex-end' : 'flex-start',
                            maxWidth: '70%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: isOwn ? 'flex-end' : 'flex-start'
                        }}
                    >
                        {!isOwn && <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '4px', marginLeft: '4px' }}>{msg.username}</span>}
                        <div 
                            style={{ 
                                background: isOwn ? 'var(--primary-gradient)' : 'rgba(255,255,255,0.1)',
                                padding: '12px 16px',
                                borderRadius: isOwn ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                fontSize: '0.95rem',
                                lineHeight: '1.4',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                            }}
                        >
                            {msg.text}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MessageList;
