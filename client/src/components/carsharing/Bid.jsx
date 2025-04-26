import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Bid = () => {
    const location = useLocation();
    const [cars, setCars] = useState([]);
    const [formData, setFormData] = useState({
      name: '',
      phone: '',
      comment: '',
      carId: '',
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
  
    useEffect(() => {
      const fetchCars = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/cars');
          setCars(response.data);
          setIsLoading(false);
          
          if (location.state?.preFilledData) {
            setFormData(prev => ({
              ...prev,
              carId: location.state.preFilledData.carId.toString()
            }));
          }
        } catch (error) {
          console.error('Error fetching cars:', error);
          setIsLoading(false);
        }
      };
  
      fetchCars();
    }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const selectedCar = cars.find(car => car.id == formData.carId);
      
      const orderData = {
        ...formData,
        carModel: selectedCar?.model || '',
        carPrice: selectedCar?.price_per_day || 0
      };

      await axios.post('http://localhost:5000/api/orders', orderData);
      
      setSubmitSuccess(true);
      setFormData({
        name: '',
        phone: '',
        comment: '',
        carId: '',
      });
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-wrapper">
    <div className="order-form-container" id='carcharing-form'>
      <h2>Форма заявки на аренду</h2>
      
      <div className={`success-message ${submitSuccess ? 'visible' : ''}`}>
        Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.
      </div>

      <form onSubmit={handleSubmit} className="order-form">
        <div className="form-group">
          <label htmlFor="name">Ваше имя:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Иван Иванов"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Телефон:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+7 (999) 123-45-67"
          />
        </div>

        <div className="form-group">
          <label htmlFor="comment">Комментарий к заказу:</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Дополнительные пожелания"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="carId">Выберите автомобиль:</label>
          {isLoading ? (
            <div className="loading">Загрузка списка автомобилей...</div>
          ) : (
            <select
              id="carId"
              name="carId"
              value={formData.carId}
              onChange={handleChange}
              required
            >
              <option value="">-- Выберите автомобиль --</option>
              {cars.map(car => (
                <option key={car.id} value={car.id}>
                  {car.model} ({car.transmission}, {car.power} л.с.) - {car.price_per_day.toLocaleString('ru-RU')} руб/сут
                </option>
              ))}
            </select>
          )}
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting || isLoading}
        >
          {isSubmitting ? 'Отправка...' : 'Заказать автомобиль'}
        </button>
      </form>
    </div>
    </div>
  );
};

export default Bid;