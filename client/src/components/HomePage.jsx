import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
      const navigate = useNavigate();

      const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
        window.location.reload();
      };
    return (
        <div className='mainPg'>
            <button onClick={handleLogout} className='login'>Выйти</button>
            <div className="logo">
                <img src="/logo.png" alt="taxi" />
                ИХАЛИ
            </div>
            <p>
                сервис каршеринга и такси
            </p>
            <div className="background">
                <a href="/carsharing/">
                    <img src="/carsharing.png" alt="carsharing" /> 
                    <div className="subtitle">Каршеринг</div> 
                    <div className="overlay"></div>
                </a>
                <a href="/taxi/">
                    <img src="/taxi.jpg" alt="taxi" />
                    <div className="subtitle">Такси</div> 
                    <div className="overlay"></div>
                </a>
            </div>
        </div>
    );
};

export default HomePage;