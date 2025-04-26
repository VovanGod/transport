import React, { useEffect, useState } from 'react';
import Card from './Card';

const Cars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCars = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/cars');
            const data = await response.json();
            setCars(data);
            setLoading(false);
        } catch (error) {
            console.error('Ошибка получения данных:', error);
            setLoading(false);
        }
        };

        fetchCars();
    }, []);

    if (loading) return <div>Loading...</div>

    return (
        <section className='carsharing-cars' id='carsharing-cars'>
            <h1>Каталог автомобилей</h1>

            <div className="cards-wrapper">
                {cars.map((car) => <Card key={car.id} car={car} />)}
            </div>
        </section>
    );
};

export default Cars;