import React from 'react';

const TaxiCard = ({ driver, onDelete, isDeleting }) => {
    return (
        <div className={`card ${isDeleting ? 'deleting' : ''}`}>
            <img 
                src={driver.image_url} 
                alt={`Фото ${driver.name}`}
                onError={(e) => {
                    e.target.src = '/images/drivers/default.png';
                }}
            />
            <div className='name'>{driver.name}</div>
            <div className='stage'>Стаж: {driver.experience} {getYearWord(driver.experience)}</div>
            <button 
                className="delete-btn"
                onClick={() => onDelete(driver.id)}
                disabled={isDeleting}
            >
                {isDeleting ? 'Удаление...' : 'Удалить'}
            </button>
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

export default TaxiCard;