import React, { useState, useEffect, useRef } from 'react';

function Chat({ socket, username, room, leaveRoom }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [file, setFile] = useState(null);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessages((list) => [...list, data]);
        });

        socket.on("receive_file", (data) => {
            setMessages((list) => [...list, data]);
        });

        return () => {
            socket.off("receive_message");
            socket.off("receive_file");
        };
    }, [socket]);

    const sendMessage = async () => {
        if (message !== "") {
            const messageData = {
                room: room,
                author: username,
                message: message,
                type: 'text',
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessages((list) => [...list, messageData]);
            setMessage("");
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const sendFile = () => {
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const fileData = {
                    room: room,
                    author: username,
                    type: 'file',
                    fileName: file.name,
                    body: reader.result, // base64
                    time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
                };
                socket.emit("send_file", fileData);
                setMessages((list) => [...list, fileData]);
                setFile(null);
            };
            reader.readAsDataURL(file);
        }
    }


    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Room: <b>{room}</b></p>
                <button onClick={leaveRoom} style={{ padding: '5px 10px', fontSize: '12px', background: '#ef4444' }}>Leave</button>
            </div>
            <div className="chat-body">
                {messages.map((msg, index) => {
                    return (
                        <div key={index} className={`message ${username === msg.author ? "you" : "other"}`}>
                            <div className="message-meta">{msg.author} <span style={{ fontSize: '10px', fontWeight: 'normal' }}>{msg.time}</span></div>
                            {msg.type === 'text' ? (
                                <div className="message-content">
                                    <p>{msg.message}</p>
                                </div>
                            ) : (
                                <div className="message-content file-message">
                                    <span>📎 {msg.fileName}</span>
                                    {/* For receiving side, show download link */}
                                    {(username !== msg.author || true) && (
                                        <a
                                            href={msg.body}
                                            download={msg.fileName}
                                            className="download-btn"
                                        >
                                            Download
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-footer">
                {file ? (
                    <div style={{ flex: 1, display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <span>{file.name}</span>
                        <button onClick={sendFile} style={{ margin: 0 }}>Send File</button>
                        <button onClick={() => setFile(null)} style={{ margin: 0, background: '#ef4444' }}>Cancel</button>
                    </div>
                ) : (
                    <>
                        <input
                            type="text"
                            value={message}
                            placeholder="Type a message..."
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <label className="file-input-label">
                            <input type="file" style={{ display: 'none' }} onChange={handleFileChange} />
                            <span>📎</span>
                        </label>
                        <button onClick={sendMessage} style={{ margin: 0 }}>&#9658;</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Chat;
