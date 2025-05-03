import React, { useState, useEffect } from 'react';
import TaxiCard from './TaxiCard';

const TaxiDrivers = () => {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

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

    const handleDelete = async (id) => {
        try {
            setDeletingId(id);
            const response = await fetch(`http://localhost:5000/api/drivers/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) throw new Error('Ошибка удаления');
            
            setDrivers(prev => prev.filter(driver => driver.id !== id));
        } catch (err) {
            setError(err.message);
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) return <div className="loading">Загрузка данных...</div>;
    if (error) return <div className="error">Ошибка: {error}</div>;

    return (
        <section className="taxi-drivers">
            <a href='/' className='login'>Назад</a>
            <h1>Наши "шумахеры"</h1>
            <div className="wrapper">
                {drivers.map(driver => (
                    <TaxiCard 
                        key={driver.id} 
                        driver={driver} 
                        onDelete={handleDelete}
                        isDeleting={deletingId === driver.id}
                    />
                ))}
            </div>
        </section>
    );
};

export default TaxiDrivers;