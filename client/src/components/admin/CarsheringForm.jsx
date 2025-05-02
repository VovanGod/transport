import React, { useState } from 'react';
import axios from 'axios';

const CarsheringForm = () => {
  const [formData, setFormData] = useState({
    model: '',
    transmission: 'automatic',
    power: '',
    price_per_day: '',
    image_url: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const transmissionOptions = [
    { value: 'Automatic', label: 'Автомат' },
    { value: 'Manual', label: 'Механика' },
    { value: 'Robot', label: 'Робот' },
    { value: 'Variator', label: 'Вариатор' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post('http://localhost:5000/api/cars', {
        model: formData.model,
        transmission: formData.transmission,
        power: parseInt(formData.power),
        price_per_day: parseFloat(formData.price_per_day),
        image_url: formData.image_url
      });

      if (response.status === 201) {
        setSuccess(true);
        setFormData({
          model: '',
          transmission: 'automatic',
          power: '',
          price_per_day: '',
          image_url: ''
        });
        
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при добавлении автомобиля');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="addCar">
      <a href='/' className='login'>Назад</a>
    <div className="form-add-car-container">
      <h2>Добавить новый автомобиль</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="model">Модель автомобиля</label>
          <input
            type="text"
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="transmission">Коробка передач</label>
          <select
            id="transmission"
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            required
          >
            {transmissionOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="power">Мощность (л.с.)</label>
          <input
            type="number"
            id="power"
            name="power"
            value={formData.power}
            onChange={handleChange}
            min="50"
            max="2000"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price_per_day">Цена за сутки (руб)</label>
          <input
            type="number"
            id="price_per_day"
            name="price_per_day"
            value={formData.price_per_day}
            onChange={handleChange}
            min="1000"
            step="100"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image_url">Ссылка на изображение</label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Автомобиль успешно добавлен!</div>}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Добавление...' : 'Добавить автомобиль'}
        </button>
      </form>

      {success && (
        <div className="success-notification">
          Автомобиль успешно добавлен!
        </div>
      )}
    </div>
    </div>
  );
};

export default CarsheringForm;