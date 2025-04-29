import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const navigate = useNavigate();

      const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
        window.location.reload();
      };
    return (
        <div className="admin-panel">
            <button onClick={handleLogout} className='login'>Выйти</button>
            <h1>Административная панель</h1>
            <div className="admin-content">
                {/* Здесь будет контент админки */}
                <p>Добро пожаловать, администратор!</p>
            </div>
        </div>
    );
};

export default AdminPanel;