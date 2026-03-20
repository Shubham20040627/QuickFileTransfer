import React from 'react';

const RoomActionCard = ({ icon: Icon, title, description, onClick, color }) => {
    return (
        <div 
            className="glass-card animate-fade-in" 
            style={{ 
                padding: '32px', 
                cursor: 'pointer', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: '16px', 
                transition: 'transform 0.3s, background 0.3s',
                width: '100%',
                maxWidth: '280px'
            }}
            onClick={onClick}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            <div style={{ backgroundColor: color, padding: '16px', borderRadius: '16px' }}>
                <Icon size={32} color="white" />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>{title}</h3>
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', fontSize: '0.9rem' }}>{description}</p>
        </div>
    );
};

export default RoomActionCard;
