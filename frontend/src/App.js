import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import axios from 'axios';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Проверяем, есть ли текущий пользователь
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:8000/auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user:', error);
                    localStorage.removeItem('token');
                });
        }
    }, []);

    const handleLogin = (user) => {
        setUser(user);
    };

    return (
        <Router>
            <Switch>
                <Route path="/login">
                    {user ? <Redirect to="/" /> : <Login onLogin={handleLogin} />}
                </Route>
                <Route path="/register">
                    {user ? <Redirect to="/" /> : <Register />}
                </Route>
                <Route path="/">
                    {user ? <Home user={user} /> : <Redirect to="/login" />}
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
