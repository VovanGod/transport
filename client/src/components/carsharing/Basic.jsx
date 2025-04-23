import React from 'react';

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
                        <li><a href="#">Автомобили</a></li>
                        <li><a href="#">Такси</a></li>
                        <li><a href="#">Поддержка</a></li>
                        <li><a href="tel:79002464129" className='tel'>+7 900 246 41 29</a></li>
                    </ul>
                </nav>
            </header>
            <div className="container">
                <h1>Каршеринг, который всегда под рукой</h1>
                <button>Выбрать автомобиль</button>
            </div>
        </section>
    );
};

export default Basic;