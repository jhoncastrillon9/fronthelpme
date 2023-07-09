import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/login', {
        nombre: username,
        contraseña: password
      });

      // Verificar la respuesta del servidor
      if (response.status === 200) {
        // Autenticación exitosa
        console.log('Autenticación exitosa');
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
      const response = await axios.post('/usuarios', {
        username: username,
        password
      });

      // Verificar la respuesta del servidor
      if (response.status === 201) {
        // Registro exitoso
        console.log('Registro exitoso');
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

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>Username:</label>
        <input type="text" value={username} onChange={handleUsernameChange} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
        <br />
        <button type="submit">Login</button>
      </form>

      <form onSubmit={handleRegistration}>
        <h2>Registrarse</h2>
        <label>Username:</label>
        <input type="text" value={username} onChange={handleUsernameChange} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
        <br />
        <button type="submit">Registrarse</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;