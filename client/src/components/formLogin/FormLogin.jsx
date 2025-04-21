import React, { useState } from 'react';

const AuthForm = () => {
  const [isActive, setIsActive] = useState(false);

  const handleSignUpClick = () => {
    setIsActive(true);
  };

  const handleSignInClick = () => {
    setIsActive(false);
  };

  return (
    <div className={`formLogin ${isActive ? 'active' : ''}`}>
        <a href='/' className='login'>Выйти</a>
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
            <form action="#" className="form form_signin">
            <h3 className="form_title">Вход</h3>
            <div className="form_input-group">
                <input type="text" className="form_input" placeholder="Логин" />
            </div>
            <div className="form_input-group">
                <input type="password" className="form_input" placeholder="Пароль" />
            </div>
            <div className="form_btn-group">
                <button className="form_btn">Войти</button>
            </div>
            <div className="form_link-group">
                <a href="#" className="form_forgot">Восстановить пароль</a>
            </div>
            </form>

            <form action="#" className="form form_signup">
            <h3 className="form_title">Регистрация</h3>
            <div className="form_input-group">
                <input type="text" className="form_input" placeholder="Логин" />
            </div>
            <div className="form_input-group">
                <input type="email" className="form_input" placeholder="Email" />
            </div>
            <div className="form_input-group">
                <input type="password" className="form_input" placeholder="Пароль" />
            </div>
            <div className="form_input-group">
                <input type="password" className="form_input" placeholder="Подтвердите пароль" />
            </div>
            <div className="form_btn-group">
                <button className="form_btn form_btn_signup">Зарегистрироваться</button>
            </div>
            </form>
        </div>
        </article>
    </div>
  );
};

export default AuthForm;