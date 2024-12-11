import React from 'react';
import ChatSupport from '../components/Chat/ChatSupport';
import { commonStyles, animations } from '../styles/commonStyles';

const ChatSupportPage = () => {
    return (
        <div style={commonStyles.pageContainer}>
            <div style={commonStyles.contentWrapper}>
                <div style={{
                    ...commonStyles.section,
                    textAlign: 'center',
                    marginBottom: '2rem',
                    animation: 'fadeIn 0.5s ease-out'
                }}>
                    <h1 style={commonStyles.title}>Chat Support</h1>
                    <p style={{
                        ...commonStyles.text,
                        fontSize: '1.2rem',
                        opacity: 0.9
                    }}>
                        Get instant help from our support team
                    </p>
                </div>

                <div style={{
                    ...commonStyles.section,
                    animation: 'slideIn 0.5s ease-out',
                    padding: 0,
                    overflow: 'hidden'
                }}>
                    <ChatSupport />
                </div>
            </div>
            <style>
                {animations}
            </style>
        </div>
    );
};

export default ChatSupportPage; 