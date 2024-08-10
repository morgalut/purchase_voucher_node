import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Optional: for styling the navbar

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const isLoggedIn = !!localStorage.getItem('token');

    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/vouchers">Vouchers</Link></li>
                <li><Link to="/users">Users</Link></li>
                <li><Link to="/purchase">Purchase</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/register">Register</Link></li>
                {isLoggedIn ? (
                    <li><button onClick={handleLogout}>Logout</button></li>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
