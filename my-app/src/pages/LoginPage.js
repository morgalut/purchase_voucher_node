import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:3002/users/login', { usernameOrEmail, password });
            console.log('Login successful:', data);
            localStorage.setItem('token', data.token);
            navigate('/');
        } catch (err) {
            console.error('Login failed:', err.response?.data || err.message);
            setError(err.response?.data.error || 'Login failed');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const isLoggedIn = !!localStorage.getItem('token');

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <h2>You are logged in!</h2>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <h2>Login</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="text"
                            placeholder="Username or Email"
                            value={usernameOrEmail}
                            onChange={(e) => setUsernameOrEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit">Login</button>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            )}
        </div>
    );
};

export default LoginPage;
