import React, { useState } from 'react';
import { User } from 'lucide-react';

const UsernameInput = ({ onContinue }) => {
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) {
            onContinue(username.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="animate-fade-in" style={{ width: '100%', maxWidth: '320px' }}>
            <div style={{ position: 'relative', marginBottom: '20px' }}>
                <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.5)' }} />
                <input
                    type="text"
                    placeholder="Enter your username"
                    className="input-field"
                    style={{ paddingLeft: '40px' }}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                Continue
            </button>
        </form>
    );
};

export default UsernameInput;
