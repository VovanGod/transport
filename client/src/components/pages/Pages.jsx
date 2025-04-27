import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AuthForm from '../formLogin/FormLogin';
import HomePage from '../HomePage';
import Carsharing from '../carsharing/Carsharing';
import Taxi from '../taxi/Taxi';

const Pages = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user);
  }, []);

  return (
    <Routes>
      <Route 
        path="/" 
        element={isAuthenticated ? <Navigate to="/user" /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/user" 
        element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} 
      />
      <Route path="/carsharing/" element={<Carsharing />} />
      <Route path="/taxi/" element={<Taxi />} />
      <Route 
        path="/login/" 
        element={isAuthenticated ? <Navigate to="/user" /> : <AuthForm setIsAuthenticated={setIsAuthenticated} />} 
      />
    </Routes>
  );
};

export default Pages;