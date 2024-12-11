import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const ChatSupport = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { isAuthenticated } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        // Add user message
        const userMessage = { text: newMessage, sender: 'user' };
        setMessages([...messages, userMessage]);
        setNewMessage('');

        try {
            // Simulate bot response
            setTimeout(() => {
                const botMessage = {
                    text: "Thank you for your message. A support representative will get back to you soon.",
                    sender: 'bot'
                };
                setMessages(prev => [...prev, botMessage]);
            }, 1000);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    if (!isAuthenticated) return null;

    return (
        <div style={styles.container}>
            {!isOpen ? (
                <button 
                    onClick={() => setIsOpen(true)}
                    style={styles.chatButton}
                >
                    Chat Support
                </button>
            ) : (
                <div style={styles.chatWindow}>
                    <div style={styles.header}>
                        <h3 style={styles.headerTitle}>Chat Support</h3>
                        <button 
                            onClick={() => setIsOpen(false)}
                            style={styles.closeButton}
                        >
                            ×
                        </button>
                    </div>
                    
                    <div style={styles.messageContainer}>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                style={{
                                    ...styles.message,
                                    ...(message.sender === 'user' ? styles.userMessage : styles.botMessage)
                                }}
                            >
                                {message.text}
                            </div>
                        ))}
                    </div>
                    
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            style={styles.input}
                        />
                        <button type="submit" style={styles.sendButton}>
                            Send
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
    },
    chatButton: {
        backgroundColor: '#d4af37',
        color: '#000',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '10px',
        cursor: 'pointer',
        fontSize: '16px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease',
    },
    chatWindow: {
        width: '300px',
        height: '400px',
        backgroundColor: '#1a1a1a',
        borderRadius: '15px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    header: {
        backgroundColor: '#2d2d2d',
        padding: '15px',
        borderTopLeftRadius: '15px',
        borderTopRightRadius: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    },
    headerTitle: {
        margin: 0,
        color: '#d4af37',
        fontSize: '16px',
    },
    closeButton: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#fff',
        fontSize: '24px',
        cursor: 'pointer',
        padding: '0 5px',
    },
    messageContainer: {
        flex: 1,
        padding: '15px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    message: {
        padding: '10px 15px',
        borderRadius: '10px',
        maxWidth: '80%',
        wordBreak: 'break-word',
    },
    userMessage: {
        backgroundColor: '#d4af37',
        color: '#000',
        alignSelf: 'flex-end',
    },
    botMessage: {
        backgroundColor: '#2d2d2d',
        color: '#fff',
        alignSelf: 'flex-start',
    },
    form: {
        padding: '15px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        gap: '10px',
    },
    input: {
        flex: 1,
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backgroundColor: '#2d2d2d',
        color: '#fff',
        fontSize: '14px',
    },
    sendButton: {
        backgroundColor: '#d4af37',
        color: '#000',
        border: 'none',
        padding: '8px 15px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'all 0.3s ease',
    },
};

export default ChatSupport; 