import React, { useState } from 'react';
import { UploadCloud, X } from 'lucide-react';

const FileTransferZone = ({ onFileShared }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            readFile(file);
        }
    };

    const readFile = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            onFileShared({
                name: file.name,
                type: file.type,
                size: file.size,
                content: e.target.result
            });
        };
        reader.readAsDataURL(file);
    };

    const onDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = () => {
        setIsDragging(false);
    };

    const onDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            readFile(file);
        }
    };

    return (
        <div 
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            style={{ 
                border: `2px dashed ${isDragging ? '#667eea' : 'var(--glass-border)'}`,
                borderRadius: '24px',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                background: isDragging ? 'rgba(102, 126, 234, 0.1)' : 'rgba(255,255,255,0.02)',
                transition: 'all 0.3s ease',
                textAlign: 'center'
            }}
        >
            <div style={{ background: 'var(--primary-gradient)', padding: '20px', borderRadius: '50%', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>
                <UploadCloud size={40} color="white" />
            </div>
            <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>Share a File</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Drag and drop or click to upload</p>
            </div>
            <input 
                type="file" 
                id="fileInput" 
                style={{ display: 'none' }} 
                onChange={handleFileChange}
            />
            <button 
                onClick={() => document.getElementById('fileInput').click()}
                className="btn-secondary"
                style={{ marginTop: '8px' }}
            >
                Select File
            </button>
        </div>
    );
};

export default FileTransferZone;
