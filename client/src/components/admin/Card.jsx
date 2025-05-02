import React, { useState } from 'react';
import axios from 'axios';

const Card = ({ car, onDelete }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

    const deleteCar = async () => {
        
        try {
            setIsDeleting(true);
            setDeleteError(null);
            const response = await axios.delete(`http://localhost:5000/api/cars/${car.id}`);
            
            if (response.status === 200) {
                onDelete(car.id);
            }
        } catch (error) {
            console.error('Ошибка при удалении автомобиля:', error);
            setDeleteError('Не удалось удалить автомобиль');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className={`card ${isDeleting ? 'card-deleting' : ''}`}>
            {car.image_url && (
                <div className="car-image">
                    <img src={car.image_url} alt={`${car.model}`} />
                </div>
            )}
            <div className='info'>
                <div className="transmission">{car.transmission}</div>
                <div className="name">{car.model}</div>
                <p>мощность {car.power} л.с.</p>
            </div>
            <div className="price">
                {car.price_per_day.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} руб/сут
            </div>
            <button 
                className='delete' 
                onClick={deleteCar}
                disabled={isDeleting}
            >
                Удалить
            </button>
            {deleteError && <div className="delete-error">Нельзя удалить автомобиль, так как есть связанные заказы!</div>}
        </div>
    );
};

export default Card;