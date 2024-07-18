import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ConsultationList from './components/Consultations/ConsultationList';
import CreateConsultation from './components/Consultations/CreateConsultation';
import BookConsultation from './components/Consultations/BookConsultation';
import BookingList from './components/Bookings/BookingList';
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <Navbar />
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/consultations" exact component={ConsultationList} />
                        <PrivateRoute path="/consultations/book/:id" component={BookConsultation} />
                        <PrivateRoute path="/create-consultation" component={CreateConsultation} />
                        <PrivateRoute path="/bookings" component={BookingList} />
                    </Switch>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
