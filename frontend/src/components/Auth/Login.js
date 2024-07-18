import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const history = useHistory();
    const { setUser } = useContext(AuthContext);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/auth/login', {
                email,
                password
            });

            const { token } = response.data;
            localStorage.setItem('token', token);

            // Получение данных пользователя из токена
            const userPayload = JSON.parse(atob(token.split('.')[1]));
            localStorage.setItem('user', JSON.stringify(userPayload));
            setUser(userPayload);

            history.push('/'); // Перенаправляем пользователя на главную страницу после успешного логина
        } catch (error) {
            console.error('Login failed:', error);
            setMessage('Login failed: ' + (error.response?.data?.error || error.message));
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;
