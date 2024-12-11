import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { commonStyles, animations } from '../styles/commonStyles';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/register', {
                username,
                email,
                password,
            });
            alert(response.data.message);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Error during registration');
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#121212',
            padding: '2rem'
        }}>
            <div style={{
                width: '400px',
                padding: '2rem',
                backgroundColor: '#1e1e1e',
                borderRadius: '15px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                animation: 'fadeIn 0.5s ease-out'
            }}>
                <h1 style={commonStyles.title}>Register</h1>
                
                {error && (
                    <div style={{
                        padding: '1rem',
                        marginBottom: '1.5rem',
                        backgroundColor: 'rgba(255, 107, 107, 0.1)',
                        borderRadius: '8px',
                        border: '1px solid #ff6b6b'
                    }}>
                        <p style={{ color: '#ff6b6b', margin: 0, textAlign: 'center' }}>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{
                            ...commonStyles.text,
                            display: 'block',
                            marginBottom: '0.5rem'
                        }}>
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={commonStyles.input}
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div>
                        <label style={{
                            ...commonStyles.text,
                            display: 'block',
                            marginBottom: '0.5rem'
                        }}>
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={commonStyles.input}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label style={{
                            ...commonStyles.text,
                            display: 'block',
                            marginBottom: '0.5rem'
                        }}>
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={commonStyles.input}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        style={{
                            ...commonStyles.button,
                            width: '100%',
                            marginTop: '1rem'
                        }}
                    >
                        Register
                    </button>

                    <div style={commonStyles.flexCenter}>
                        <a 
                            href="/login" 
                            style={commonStyles.link}
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/login');
                            }}
                        >
                            Already have an account? Login
                        </a>
                    </div>
                </form>
            </div>
            <style>
                {animations}
            </style>
        </div>
    );
};

export default Register;
