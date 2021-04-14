import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import HomePage from 'pages/HomePage';
import SensorPage from 'pages/SensorPage';
import GroupPage from 'pages/GroupPage';

import ScrollToTop from 'components/ScrollToTop';

function App() {
  return (
    <div className="App">
      <Router>
        <h1>Iotility</h1>
        <ScrollToTop />
        <Switch>
          <Route path="/groups/:id">
            <GroupPage />
          </Route>
          <Route path="/sensors/:id">
            <SensorPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
