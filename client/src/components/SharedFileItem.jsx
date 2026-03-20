import React from 'react';
import { File, Download, User } from 'lucide-react';

const SharedFileItem = ({ file, isOwn, sender }) => {
    const handleDownload = () => {
        // file.content is the base64 or blob URL
        const link = document.createElement('a');
        link.href = file.content;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const formatSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div 
            style={{ 
                alignSelf: isOwn ? 'flex-end' : 'flex-start',
                maxWidth: '70%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: isOwn ? 'flex-end' : 'flex-start'
            }}
        >
            {!isOwn && <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '4px', marginLeft: '4px' }}>{sender}</span>}
            <div 
                className="glass-card" 
                style={{ 
                    padding: '12px 16px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    borderColor: isOwn ? 'rgba(255,255,255,0.4)' : 'var(--glass-border)',
                    background: isOwn ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
                    borderRadius: '16px'
                }}
            >
                <div style={{ background: 'var(--secondary-gradient)', padding: '10px', borderRadius: '12px' }}>
                    <File size={20} color="white" />
                </div>
                <div style={{ flex: 1, minWidth: '0' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{formatSize(file.size)}</div>
                </div>
                <button 
                    onClick={handleDownload}
                    style={{ background: 'rgba(255,255,255,0.1)', border: 'none', padding: '8px', borderRadius: '50%', cursor: 'pointer', color: 'white' }}
                >
                    <Download size={16} />
                </button>
            </div>
        </div>
    );
};

export default SharedFileItem;
