import React, { useState } from 'react';
import axios from 'axios';
import Home from './Home'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [elementos, setElementos] = useState([]);
  const [userId, setUserId] = useState(0);


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
        setElementos(response.data.casos);
        setUserId(response.data.id);        
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
      const response = await axios.post('/usuarios', {
        username: username,
        password
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
console.log('Login userId' + userId);
  if (authenticated) {    
    return <Home elementos={elementos} userId={userId} />;
  }

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
        <button onClick={handleRegistration}>Registrarse</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;