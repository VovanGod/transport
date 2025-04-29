import React, { useState } from 'react';

const Bid = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    from: '',
    to: '',
    carType: 'economy'
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/taxi-orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          from_address: formData.from,
          to_address: formData.to,
          car_type: formData.carType
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          name: '',
          phone: '',
          from: '',
          to: '',
          carType: 'economy'
        });
        
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Ошибка при отправке заявки:', error);
    }
  };

  return (
    <section className='taxi-bid' id='taxi-bid'>
      <div className="taxi-form">
        <form className="taxi-order-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Вызвать такси</h2>
          
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ваше имя"
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+7 999 123-45-67"
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleChange}
              placeholder="Откуда"
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleChange}
              placeholder="Куда"
              required
            />
          </div>
          
          <div className="form-group">
            <div className="car-type-options">
              <label className={`car-type-label ${formData.carType === 'economy' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="carType"
                  value="economy"
                  checked={formData.carType === 'economy'}
                  onChange={handleChange}
                />
                Эконом
              </label>
              
              <label className={`car-type-label ${formData.carType === 'comfort' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="carType"
                  value="comfort"
                  checked={formData.carType === 'comfort'}
                  onChange={handleChange}
                />
                Комфорт
              </label>
              
              <label className={`car-type-label ${formData.carType === 'business' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="carType"
                  value="business"
                  checked={formData.carType === 'business'}
                  onChange={handleChange}
                />
                Бизнес
              </label>
            </div>
          </div>
          
          <button type="submit" className="submit-btn">
            ЗАКАЗАТЬ АВТОМОБИЛЬ
          </button>
        </form>

        {showSuccess && (
          <div className="success-notification">
            <div className="success-content">
              <svg viewBox="0 0 24 24" className="success-icon">
                <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
              </svg>
              <p>Заявка успешно отправлена!</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Bid;