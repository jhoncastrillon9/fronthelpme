import React, { useState } from 'react';
import axios from 'axios';
import Home from './Home'
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [elementos, setElementos] = useState([]);
  const [userId, setUserId] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);



  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/login', {
        nombre: username,
        contraseña: password,
        isAdmin: false
      });

      // Verificar la respuesta del servidor
      if (response.status === 200) {
        // Autenticación exitosa
        setElementos(response.data.casos);
        setUserId(response.data.id);  
        setIsAdmin(response.data.isAdmin);        

        console.log('Autenticación exitosa');   

        setAuthenticated(true);
      } else {
        // Autenticación fallida
        setError('Credenciales inválidas');
      }
    } catch (error) {
      console.log(error);
      setError('Error en el servidor');
    }
  };

  const handleRegistration = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/usuarios', {
        nombre: username,
        contraseña: password,
        isAdmin: false
      });

      // Verificar la respuesta del servidor
      if (response.status === 201) {
        // Registro exitoso
        console.log('Registro exitoso');   
        setUserId(response.id);     
        setAuthenticated(true);
      } else {
        setError('Error en el registro');
      }
    } catch (error) {
      console.log(error);
      setError('Error en el servidor');
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  if (authenticated) {    
    return <Home setElementos={setElementos} elementos={elementos} userId={userId} isAdmin={isAdmin}/>;
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="title" style={{ color: "#ae48b1" }}>
          Login
        </h1>
        <h3 className="subtitle" style={{ color: "##7d48b1" }}>
          helpMe
        </h3>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username" style={{ color: "#ae48b1" }}>
              Username:
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" style={{ color: "#ae48b1" }}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#ae48b1" }}>
              Login
            </button>
            <button onClick={handleRegistration} className="btn btn-secondary" style={{ backgroundColor: "##7d48b1" }}>
              Registrarse
            </button>
          </div>
        </form>
    
        {error && <p className="error-message" style={{ color: "#ae48b1" }}>{error}</p>}
      </div>
    </div>
  );


};

export default Login;