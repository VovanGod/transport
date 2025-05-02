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
        <div className='mainPg adminPage'>
            <button onClick={handleLogout} className='login'>Выйти</button>
            <div className="logo">
                <img src="/hacker.png" alt="taxi" />
                ADMIN
            </div>
            <p>
                абсолютная власть <br /> по редактированию записей
            </p>
            <div className="adminPage-wrapper">
                <a href="/adminCarsh-bid/" className='card'>
                    <img src="/puzzle.png" alt="" />
                    <div className='type'>Каршеринг</div>
                    <div className='text'>Заявки на аренду автомобиля</div>
                </a>
                <a href="/adminCarsh-cars/" className='card'>
                    <img src="/puzzle.png" alt="" />
                    <div className='type'>Каршеринг</div>
                    <div className='text'>Автопарк</div>
                </a>
                <a href="/adminCarsh-form/" className='card'>
                    <img src="/puzzle.png" alt="" />
                    <div className='type'>Каршеринг</div>
                    <div className='text'>Добавить автомобиль</div>
                </a>
                <a href="#" className='card'>
                    <img src="/puzzle.png" alt="" />
                    <div className='type'>Такси</div>
                    <div className='text'>Заявки на поездку</div>
                </a>
                <a href="#" className='card'>
                    <img src="/puzzle.png" alt="" />
                    <div className='type'>Такси</div>
                    <div className='text'>Водители</div>
                </a>
            </div>
        </div>
    );
};

export default AdminPanel;