import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { commonStyles, animations } from '../styles/commonStyles';
import axios from 'axios';

// Set axios default base URL
axios.defaults.baseURL = 'http://localhost:5000';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isAdmin ? '/api/users/admin-login' : '/api/users/login';
            const payload = isAdmin ? { adminPassword: password } : { email, password };
            
            const response = await axios.post(endpoint, payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.data.token) {
                const { token, user } = response.data;
                login(token, user);
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
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
                <h1 style={commonStyles.title}>Login</h1>
                
                <div style={commonStyles.flexCenter}>
                    <label style={{
                        ...commonStyles.text,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer'
                    }}>
                        <input
                            type="checkbox"
                            checked={isAdmin}
                            onChange={(e) => {
                                setIsAdmin(e.target.checked);
                                setError('');
                                setEmail('');
                                setPassword('');
                            }}
                            style={{ cursor: 'pointer' }}
                        />
                        Admin Login
                    </label>
                </div>

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
                    {!isAdmin && (
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
                                required={!isAdmin}
                            />
                        </div>
                    )}
                    
                    <div>
                        <label style={{
                            ...commonStyles.text,
                            display: 'block',
                            marginBottom: '0.5rem'
                        }}>
                            {isAdmin ? 'Admin Password' : 'Password'}
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={commonStyles.input}
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
                        {isAdmin ? 'Admin Login' : 'Login'}
                    </button>
                </form>
            </div>
            <style>
                {animations}
            </style>
        </div>
    );
};

export default Login;
