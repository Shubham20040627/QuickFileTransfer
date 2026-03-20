import React, { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';

const MessageInput = ({ onSendMessage, onFileSelect }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onSendMessage(text.trim());
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '24px', position: 'relative', display: 'flex', gap: '12px' }}>
            <button 
                type="button" 
                onClick={onFileSelect}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '12px', borderRadius: '12px', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}
            >
                <Paperclip size={20} />
            </button>
            <input 
                className="input-field" 
                placeholder="Type a message..." 
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button type="submit" className="btn-primary" style={{ padding: '12px' }}>
                <Send size={20} />
            </button>
        </form>
    );
};

export default MessageInput;
