import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
// import HomePage from './home/HomePage';
import Header from './common/Header';
import AboutPage from './about/AboutPage';
import TasksPage from './task/TasksPage';
import history from '../history';
import ManageTaskPage from './task/ManageTaskPage';

const App = () => (
  <Router history={history}>
    <div className="container-fluid">
      <Header />
      <Switch>
        {/* <Route path="/" component={HomePage} exact /> */}
        <Route path="/" component={TasksPage} exact />
        <Route path="/task/:id" component={ManageTaskPage} />
        <Route path="/task" component={ManageTaskPage} />
        <Route path="/about" component={AboutPage} />
      </Switch>
    </div>
  </Router>
);

export default App;
