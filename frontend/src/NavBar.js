import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav>
    <ul className="home">
      <li><Link to="/">Home</Link></li>
    </ul>
    <ul className="lilo">
      <li className="siso"><Link to="/account/login">Sign In</Link></li>
      <li className="register"><Link to="/account/create">Become an Author!</Link></li>
    </ul>
  </nav>
);

export default NavBar;
