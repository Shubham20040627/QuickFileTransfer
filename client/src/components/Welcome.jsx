import React from 'react';

function Welcome({ setUsername, setScreen }) {
    const [input, setInput] = React.useState('');

    const handleStart = () => {
        if (input.trim()) {
            setUsername(input);
            setScreen('room');
        }
    };

    return (
        <div className="screen">
            <h1>Sync Drop</h1>
            <p>Share messages and files securely in real-time.</p>
            <input
                type="text"
                placeholder="Enter your username..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleStart()}
            />
            <button onClick={handleStart}>Get Started</button>
        </div>
    );
}

export default Welcome;
