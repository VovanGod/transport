import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaxiOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/taxi-orders');
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Ошибка при загрузке заявок:', err);
      setError('Не удалось загрузить заявки');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {  
    try {
      setDeletingId(id);
      await axios.delete(`http://localhost:5000/api/taxi-orders/${id}`);
      setOrders(prev => prev.filter(order => order.id !== id));
    } catch (err) {
      console.error('Ошибка при удалении:', err);
      setError('Не удалось удалить заявку');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU');
  };

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="taxi-orders-container">
        <a href='/' className='login'>Назад</a>
      <h1>Заявки на такси</h1>
      <div className="wrapper">
      {orders.length === 0 ? (
        <div className="no-orders">Нет доступных заявок</div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>{order.name}</h3>
                <span className="order-date">{formatDate(order.created_at)}</span>
              </div>
              
              <div className="order-details">
                <div className="detail-row">
                  <span className="detail-label">Телефон:</span>
                  <span>{order.phone}</span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Откуда:</span>
                  <span>{order.from_address}</span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Куда:</span>
                  <span>{order.to_address}</span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Класс:</span>
                  <span className={`car-type ${order.car_type}`}>
                    {order.car_type}
                  </span>
                </div>
              </div>
              
              <button 
                className="delete-btn"
                onClick={() => handleDelete(order.id)}
                disabled={deletingId === order.id}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default TaxiOrders;