import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ConsultationList from './components/Consultations/ConsultationList';
import ConsultationDetail from './components/Consultations/ConsultationDetail';
import CreateConsultation from './components/Consultations/CreateConsultation';
import BookConsultation from './components/Consultations/BookConsultation';
import BookingList from './components/Bookings/BookingList';
import BookingDetail from './components/Bookings/BookingDetail';
import Navbar from './components/Navbar';
import PrivateRoute from './routes';

function App() {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <PrivateRoute path="/consultations" component={ConsultationList} />
                <PrivateRoute path="/consultation/:id" component={ConsultationDetail} />
                <PrivateRoute path="/create-consultation" component={CreateConsultation} />
                <PrivateRoute path="/book-consultation" component={BookConsultation} />
                <PrivateRoute path="/bookings" component={BookingList} />
                <PrivateRoute path="/booking/:id" component={BookingDetail} />
                <PrivateRoute exact path="/" component={ConsultationList} />

            </Switch>
        </Router>
    );
}

export default App;
