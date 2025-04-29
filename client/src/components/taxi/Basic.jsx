import React, { useRef } from 'react';

const Basic = () => {
    return (
        <section className='taxi-basic'>
            <a href='/' className='login'>Назад</a>
            <img src="/taxiBasic.jpg" alt="photo" className='section-img'/>
            <div className="overlay"></div>
            <header>
                <a href="/" className="logo">
                    <img src="/logo.png" alt="taxi" />
                    ИХАЛИ
                </a>

                <nav>
                    <ul>
                        <li><a href="#taxi-bid">Заказать</a></li>
                        <li><a href="/carsharing/">Каршеринг</a></li>
                        <li><a href="tel:79002464129" className='tel'>+7 900 246 41 29</a></li>
                    </ul>
                </nav>
            </header>
            <div className="container">
                <h1>Такси на все случаи жизни</h1>
                <a href="#taxi-bid" className='button'>Заказать автомобиль</a>
            </div>
        </section>
    );
};

export default Basic;