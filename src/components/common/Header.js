import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <nav>
    {/* <NavLink to="/" activeClassName="active" exact>
      Главная
    </NavLink>
{' | '} */}
    <NavLink to="/" activeClassName="active">
      Мои задачи
    </NavLink>
    {' | '}
    <NavLink to="/about" activeClassName="active">
      О программе
    </NavLink>
  </nav>
);

export default Header;
