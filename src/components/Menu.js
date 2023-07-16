import React from 'react';
import { Link } from 'react-router-dom';

const Menu = (props) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Mis Casos</Link>
        </li>
        <li>
          <Link to="/publicHome">Casos Publicos</Link>
        </li>
        {props.isAdmin && (  // Verificar la propiedad isAdmin
          <li>
            <Link to="/adminCasos">Administrar Casos</Link>
          </li>
        )}

        {props.isAdmin && (  // Verificar la propiedad isAdmin
          <li>
            <Link to="/adminUsers">Administrar usuarios</Link>
          </li>
        )}
        <li>
          <Link to="/">Salir</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;