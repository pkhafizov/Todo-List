import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div className="jumbotron">
    <h1>To-do List</h1>
    <p>Список дел</p>
    <Link to="about" className="btn btn-primary btn-lg">О программе</Link>
  </div>
);

export default HomePage;
