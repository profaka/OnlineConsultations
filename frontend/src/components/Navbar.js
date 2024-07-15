import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('http://localhost:8000/auth/me', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setUserName(response.data.user.name);
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                }
            }
        };

        fetchUserData();
    }, []);

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
                <li>
                    <Link to="/consultations">Consultations</Link>
                </li>
                <li>
                    <Link to="/create-consultation">Create Consultation</Link>
                </li>
                <li>
                    <Link to="/book-consultation">Book Consultation</Link>
                </li>
                {userName && <li>Welcome, {userName}!</li>}
            </ul>
        </nav>
    );
}

export default Navbar;
