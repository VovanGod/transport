import React from 'react';

const Card = ({ driver }) => {
    return (
        <div className="card">
            <img 
                src={driver.image_url} 
                alt={driver.name}
                onError={(e) => {
                    e.target.src = '/images/drivers/default.jpg';
                }}
            />
            <div className='name'>{driver.name}</div>
            <div className='stage'>Стаж: {driver.experience} {getYearWord(driver.experience)}</div>
        </div>
    );
};

function getYearWord(years) {
    if (years % 100 >= 11 && years % 100 <= 14) return 'лет';
    switch(years % 10) {
        case 1: return 'год';
        case 2:
        case 3:
        case 4: return 'года';
        default: return 'лет';
    }
}

export default Card;