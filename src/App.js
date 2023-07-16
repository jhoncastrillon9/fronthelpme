import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import PublicHome from './components/PublicHome';
import AdminCasos from './components/AdminCasos';
import AdminUsers from './components/AdminUsers';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>      
        <Routes>          
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/publicHome" element={<PublicHome />} />
          <Route exact path="/adminCasos" element={<AdminCasos />} />
          <Route exact path="/adminUsers" element={<AdminUsers />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;