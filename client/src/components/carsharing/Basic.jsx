import React, { useRef } from 'react';

const Basic = () => {
    return (
        <section className='carsharing-basic'>
            <a href='/' className='login'>Назад</a>
            <img src="/carsharing.jpg" alt="photo" className='section-img'/>
            <div className="overlay"></div>
            <header>
                <a href="/" className="logo">
                    <img src="/logo.png" alt="taxi" />
                    ИХАЛИ
                </a>

                <nav>
                    <ul>
                        <li><a href="#carsharing-cars">Автомобили</a></li>
                        <li><a href="#">Такси</a></li>
                        <li><a href="#carcharing-form">Заказать</a></li>
                        <li><a href="tel:79002464129" className='tel'>+7 900 246 41 29</a></li>
                    </ul>
                </nav>
            </header>
            <div className="container">
                <h1>Каршеринг, который всегда под рукой</h1>
                <a href="#carsharing-cars" className='button'>Выбрать автомобиль</a>
            </div>
        </section>
    );
};

export default Basic;