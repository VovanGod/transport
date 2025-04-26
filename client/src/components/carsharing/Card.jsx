import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({car}) => {
    const navigate = useNavigate();

  const handleClick = () => {
    navigate('#carcharing-form', {
      state: {
        preFilledData: {
          carId: car.id,
          model: car.model,
          price: car.price_per_day
        }
      }
    });
  };
    return (
        <a href='#carcharing-form' onClick={handleClick} className="card">
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
            <div className="price">{car.price_per_day.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} руб/сут</div>
        </a>
    );
};

export default Card;