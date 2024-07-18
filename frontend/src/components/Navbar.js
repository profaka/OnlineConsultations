import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function Navbar() {
    const { user, setUser } = useContext(AuthContext);
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        history.push('/login');
    };

    return (
        <nav>
            <ul>
                {user ? (
                    <>
                        <li>Welcome, {user.name}</li>
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                )}
                <li>
                    <Link to="/consultations">Consultations</Link>
                </li>
                <li>
                    <Link to="/bookings">My Bookings</Link>
                </li>
                {user && user.role === 'consultant' && (
                    <li>
                        <Link to="/create-consultation">Create Consultation</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
