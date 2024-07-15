import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthContext, AuthProvider } from './components/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import ConsultationsList from './components/ConsultationsList';
import CreateConsultation from './components/CreateConsultation';
import BookConsultation from './components/BookConsultation';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';

function App() {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <PrivateRoute path="/consultations" component={ConsultationsList} />
                <PrivateRoute path="/create-consultation" component={CreateConsultation} />
                <PrivateRoute path="/book-consultation" component={BookConsultation} />
                <PrivateRoute path="/home" component={Home} />
                <Redirect from="/" to={isAuthenticated ? "/home" : "/login"} />
            </Switch>
        </Router>
    );
}

function RootApp() {
    return (
        <AuthProvider>
            <App />
        </AuthProvider>
    );
}

export default RootApp;
