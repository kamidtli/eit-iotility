import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import HomePage from './pages/HomePage';
import SensorPage from './pages/SensorPage';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <h1>Iotility</h1>

          <Switch>
            <Route path="/:id">
              <SensorPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
