import React from 'react';

const Card = () => {
    return (
        <button className="card">
            <img src="/omoda-c5.jpeg" alt="" />
            <div className='info'>
                <div className="transmission">Автомат</div>
                <div className="name">Omoda C5</div>
                <p>мощность 147 л.с.</p>
            </div>
            <div className="price">3 600 руб/сут</div>
        </button>
    );
};

export default Card;