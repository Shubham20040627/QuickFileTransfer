import React from 'react';
import UsernameInput from './UsernameInput';

const AuthContainer = ({ onContinue }) => {
    return (
        <div className="glass-card animate-fade-in" style={{ padding: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', textAlign: 'center' }}>
            <div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '8px', background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Instant File Transfer
                </h1>
                <p style={{ color: 'var(--text-muted)' }}>Real-time file transfer & messaging</p>
            </div>
            <UsernameInput onContinue={onContinue} />
        </div>
    );
};

export default AuthContainer;
