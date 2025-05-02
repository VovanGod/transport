import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const CarsheringCars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCars = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/cars');
            setCars(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Ошибка при загрузке автомобилей:', err);
            setError('Не удалось загрузить автомобили');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    const handleDeleteCar = (deletedCarId) => {
        setCars(prevCars => prevCars.filter(car => car.id !== deletedCarId));
    };

    if (loading) return <div className="loading">Загрузка...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <section className='carsharing-cars admin-cars' id='admin-cars'>
            <a href='/' className='login'>Назад</a>
            <h1>Каталог автомобилей</h1>

            {cars.length === 0 ? (
                <div className="no-cars">Нет доступных автомобилей</div>
            ) : (
                <div className="cards-wrapper">
                    {cars.map(car => (
                        <Card 
                            key={car.id} 
                            car={car} 
                            onDelete={handleDeleteCar} 
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default CarsheringCars;