import React, { useState, useEffect } from 'react';
import Card from './Card';

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/drivers');
                if (!response.ok) throw new Error('Ошибка загрузки данных');
                const data = await response.json();
                setDrivers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDrivers();
    }, []);

    if (loading) return <div className="loading">Загрузка данных...</div>;
    if (error) return <div className="error">Ошибка: {error}</div>;

    return (
        <section className="taxi-drivers">
            <h1>Наши "шумахеры"</h1>
            <div className="wrapper">
                {drivers.map(driver => (
                    <Card key={driver.id} driver={driver} />
                ))}
            </div>
        </section>
    );
};

export default Drivers;