import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CarsheringBid = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/orders');
            setOrders(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (orderId) => {
        try {
            setDeletingId(orderId);
            const response = await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
            
            if (response.status === 200) {
                setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
            }
        } catch (error) {
            console.error('Ошибка при удалении заявки:', error);
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) return <div className="loading">Загрузка...</div>;

    return (
        <div className="orders-container">
            <a href='/' className='login'>Назад</a>
            <h1>Заявки на каршеринг</h1>
            <div className="orders-list">
                {orders.map(order => (
                    <div key={order.id} className="order-card">
                        <div className="order-header">
                            <h3>{order.name}</h3>
                            <span className="order-date">
                                {new Date(order.created_at).toLocaleString()}
                            </span>
                        </div>
                        
                        <div className="order-details">
                            <p><strong>Телефон:</strong> {order.phone}</p>
                            <p><strong>Автомобиль:</strong> {order.car_model}</p>
                            <p><strong>Цена:</strong> {order.car_price} руб/сут</p>
                            {order.comment && <p><strong>Комментарий:</strong> {order.comment}</p>}
                        </div>
                        
                        <div className="order-actions">
                            <button 
                                className="delete-btn"
                                onClick={() => handleDelete(order.id)}
                                title="Удалить заявку"
                                disabled={deletingId === order.id}
                            >
                            ×
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CarsheringBid;