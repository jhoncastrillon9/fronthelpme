import React from 'react';
import { Link } from 'react-router-dom';

const Menu = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link">Mis Casos</Link>
        </li>
        <li className="nav-item">
          <Link to="/publicHome" className="nav-link">Casos Públicos</Link>
        </li>
        {props.isAdmin && (
          <li className="nav-item">
            <Link to="/adminCasos" className="nav-link">Administrar Casos</Link>
          </li>
        )}
        {props.isAdmin && (
          <li className="nav-item">
            <Link to="/adminUsers" className="nav-link">Administrar Usuarios</Link>
          </li>
        )}
        <li className="nav-item">
          <Link to="/" className="nav-link">Salir</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;