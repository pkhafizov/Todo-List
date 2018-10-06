import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import Header from './common/Header';
import history from '../history';

const App = () => (
  <Router history={history}>
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route path="/" component={HomePage} exact />
      </Switch>
    </div>
  </Router>
);

export default App;
