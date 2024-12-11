import React, { useState } from 'react';
import ChatSupport from './Chat/ChatSupport';

const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    bottom: '80px',
                    right: '20px',
                    width: '350px',
                    height: '500px',
                    backgroundColor: '#1e1e1e',
                    borderRadius: '15px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    zIndex: 1000,
                    overflow: 'hidden'
                }}>
                    <ChatSupport />
                </div>
            )}

            <div 
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#d4af37',
                    borderRadius: '50%',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    zIndex: 1000
                }}
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={e => {
                    e.target.style.transform = 'scale(1.1)';
                    e.target.style.backgroundColor = '#e5c158';
                }}
                onMouseLeave={e => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.backgroundColor = '#d4af37';
                }}
            >
                <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#000" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
            </div>
        </>
    );
};

export default ChatbotWidget; 