import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
