import React from 'react';
import Card from './Card';

const Cars = () => {
    return (
        <section className='carsharing-cars'>
            <h1>Каталог автомобилей</h1>

            <div className="cards-wrapper">
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
        </section>
    );
};

export default Cars;