import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Set axios default base URL
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('userData')));
    const [accountDetails, setAccountDetails] = useState(null);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const navigate = useNavigate();

    // Check session expiration
    useEffect(() => {
        const checkSession = () => {
            const token = localStorage.getItem('token');
            const tokenTimestamp = localStorage.getItem('tokenTimestamp');
            
            if (token && tokenTimestamp) {
                const currentTime = new Date().getTime();
                const tokenTime = parseInt(tokenTimestamp);
                const fiveMinutes = 5 * 60 * 1000;

                if (currentTime - tokenTime > fiveMinutes) {
                    logout();
                }
            }
        };

        // Check session every minute
        const interval = setInterval(checkSession, 60 * 1000);
        
        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, []);

    // Update timestamp on any user activity
    useEffect(() => {
        const updateTimestamp = () => {
            if (isAuthenticated) {
                localStorage.setItem('tokenTimestamp', new Date().getTime().toString());
            }
        };

        // Add event listeners for user activity
        window.addEventListener('mousemove', updateTimestamp);
        window.addEventListener('keypress', updateTimestamp);
        window.addEventListener('click', updateTimestamp);
        window.addEventListener('scroll', updateTimestamp);

        // Cleanup event listeners on unmount
        return () => {
            window.removeEventListener('mousemove', updateTimestamp);
            window.removeEventListener('keypress', updateTimestamp);
            window.removeEventListener('click', updateTimestamp);
            window.removeEventListener('scroll', updateTimestamp);
        };
    }, [isAuthenticated]);

    const fetchAccountOverview = async () => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            };

            const response = await axios.get(`/api/account/overview`, config);
            setAccountDetails(response.data);
            localStorage.setItem('userEmail', response.data.email);
            setError(null);
        } catch (err) {
            if (err.response?.status === 401) {
                logout();
            } else {
                setAccountDetails(null);
                setError('Error fetching account overview');
            }
        }
    };

    const login = (token, userData) => {
        localStorage.setItem('token', token);
        localStorage.setItem('tokenTimestamp', new Date().getTime().toString());
        localStorage.setItem('userData', JSON.stringify(userData));
        setAuthToken(token);
        setUser(userData);
        setIsAuthenticated(true);
        
        // Navigate based on user role
        if (userData.isAdmin) {
            navigate('/admin');
        } else {
            navigate('/dashboard');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenTimestamp');
        localStorage.removeItem('userData');
        localStorage.removeItem('userEmail');
        setAuthToken(null);
        setUser(null);
        setAccountDetails(null);
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ 
            authToken, 
            user,
            accountDetails, 
            error, 
            login, 
            logout,
            fetchAccountOverview,
            isAuthenticated,
            isAdmin: user?.isAdmin || false
        }}>
            {children}
        </AuthContext.Provider>
    );
};
