import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AuthForm from '../formLogin/FormLogin';
import HomePage from '../HomePage';
import Carsharing from '../carsharing/Carsharing';
import Taxi from '../taxi/Taxi';
import AdminPanel from '../admin/AdminPanel';

const Pages = () => {
  const [authState, setAuthState] = useState({
    user: null,
    loaded: false
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setAuthState({
        user: JSON.parse(storedUser),
        loaded: true
      });
    } else {
      setAuthState(prev => ({ ...prev, loaded: true }));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setAuthState({
      user: userData,
      loaded: true
    });
  };

  if (!authState.loaded) {
    return <div>Загрузка...</div>;
  }

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          authState.user 
            ? (authState.user.is_admin ? <Navigate to="/admin" /> : <Navigate to="/user" />)
            : <Navigate to="/login" />
        } 
      />
      <Route 
        path="/user" 
        element={
          authState.user && !authState.user.is_admin
            ? <HomePage />
            : <Navigate to="/login" />
        } 
      />
      <Route 
        path="/admin" 
        element={
          authState.user?.is_admin
            ? <AdminPanel />
            : <Navigate to="/login" replace />
        } 
      />
      <Route path="/carsharing/" element={<Carsharing />} />
      <Route path="/taxi/" element={<Taxi />} />
      <Route 
        path="/login/" 
        element={
          authState.user
            ? <Navigate to={authState.user.is_admin ? "/admin" : "/user"} />
            : <AuthForm onLoginSuccess={handleLoginSuccess} />
        } 
      />
    </Routes>
  );
};

export default Pages;