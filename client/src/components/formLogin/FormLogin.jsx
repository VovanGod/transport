import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({setIsAuthenticated}) => {
    const [isActive, setIsActive] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        loginUsername: '',
        loginPassword: ''
    });
    const [error, setError] = useState('');
    const [notification, setNotification] = useState({
        show: false,
        message: '',
        type: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (notification.show) {
            const timer = setTimeout(() => {
                setNotification(prev => ({ ...prev, show: false }));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification.show]);

    const handleSignUpClick = () => {
        setIsActive(true);
        setError('');
    };

    const handleSignInClick = () => {
        setIsActive(false);
        setError('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSignInSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                username: formData.loginUsername,
                password: formData.loginPassword
            });
    
            if (response.data.success) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                setIsAuthenticated(true);
                navigate('/user');
            } else {
                setNotification({
                    show: true,
                    message: 'Неверный логин или пароль',
                    type: 'error'
                });
            }
        } catch (err) {
            setNotification({
                show: true,
                message: err.response?.data?.error || 'Ошибка при входе',
                type: 'error'
            });
            console.error('Ошибка входа:', err);
        }
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/register', {
                username: formData.username,
                email: formData.email,
                password_hash: formData.password
            });

            setNotification({
                show: true,
                message: 'Регистрация прошла успешно!',
                type: 'success'
            });
            
            setIsActive(false);
            setFormData({
                ...formData,
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch (err) {
            setError(err.response?.data?.error || 'Ошибка при регистрации');
            setNotification({
                show: true,
                message: err.response?.data?.error || 'Ошибка при регистрации',
                type: 'error'
            });
            console.error('Ошибка регистрации:', err);
        }
    };

    return (
        <div className={`formLogin ${isActive ? 'active' : ''}`}>
            {notification.show && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                    <button 
                        className="notification-close" 
                        onClick={() => setNotification(prev => ({ ...prev, show: false }))}
                    >
                        &times;
                    </button>
                </div>
            )}
            
            <article className="container">
                <div className="block">
                    <section className="block_item block-item">
                        <h2 className="block-item_title">У вас уже есть аккаунт?</h2>
                        <button className="block-item_btn signin-btn" onClick={handleSignInClick}>
                            Войти
                        </button>
                    </section>
                    <section className="block_item block-item">
                        <h2 className="block-item_title">У вас нет аккаунта?</h2>
                        <button className="block-item_btn signup-btn" onClick={handleSignUpClick}>
                            Зарегистрироваться
                        </button>
                    </section>
                </div>

                <div className={`form-box ${isActive ? 'active' : ''}`}>
                    <form className="form form_signin" onSubmit={handleSignInSubmit}>
                        <h3 className="form_title">Вход</h3>
                        <div className="form_input-group">
                            <input 
                                type="text" 
                                className="form_input" 
                                placeholder="Логин" 
                                name="loginUsername"
                                value={formData.loginUsername}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form_input-group">
                            <input 
                                type="password" 
                                className="form_input" 
                                placeholder="Пароль" 
                                name="loginPassword"
                                value={formData.loginPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form_btn-group">
                            <button type="submit" className="form_btn">Войти</button>
                        </div>
                    </form>

                    <form className="form form_signup" onSubmit={handleSignUpSubmit}>
                        <h3 className="form_title">Регистрация</h3>
                        {error && <div className="error-message">{error}</div>}
                        <div className="form_input-group">
                            <input 
                                type="text" 
                                className="form_input" 
                                placeholder="Логин" 
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form_input-group">
                            <input 
                                type="email" 
                                className="form_input" 
                                placeholder="Email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form_input-group">
                            <input 
                                type="password" 
                                className="form_input" 
                                placeholder="Пароль" 
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form_input-group">
                            <input 
                                type="password" 
                                className="form_input" 
                                placeholder="Подтвердите пароль" 
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form_btn-group">
                            <button type="submit" className="form_btn form_btn_signup">
                                Зарегистрироваться
                            </button>
                        </div>
                    </form>
                </div>
            </article>
        </div>
    );
};

export default AuthForm;