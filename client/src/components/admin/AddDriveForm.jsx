import React, { useState } from 'react';
import axios from 'axios';

const AddDriverForm = ({ onDriverAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    experience: '',
    image: null
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.experience) {
      setError('Заполните все обязательные поля');
      return;
    }
  
    try {
      setLoading(true);
      setError(null);
      
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('experience', formData.experience);
      
      // Важно: проверяем, что файл был выбран
      if (formData.image) {
        formDataToSend.append('image', formData.image);
        console.log('Файл для отправки:', formData.image.name); // Для отладки
      } else {
        console.log('Файл не выбран'); // Для отладки
      }
  
      const response = await axios.post('http://localhost:5000/api/drivers', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log('Ответ сервера:', response.data); // Для отладки
  
      if (response.data.success) {
        setSuccess(true);
        setFormData({
          name: '',
          experience: '',
          image: null
        });
        setPreviewImage(null);
        if (onDriverAdded) {
          onDriverAdded(response.data.driver);
        }
      }
    } catch (err) {
      console.error('Ошибка при добавлении водителя:', err);
      setError(err.response?.data?.message || 'Ошибка при добавлении водителя');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addFriverForm">
        <a href='/' className='login'>Назад</a>
    <div className="add-driver-form">
      <h2>Добавить нового водителя</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Имя водителя*</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="experience">Стаж (лет)*</label>
          <input
            type="number"
            id="experience"
            name="experience"
            min="0"
            max="50"
            value={formData.experience}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="image">Фотография</label>
          <div className="image-upload">
            <label className="upload-btn">
              Выберите файл
              <input 
                type="file" 
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </label>
            {previewImage && (
              <div className="image-preview">
                <img src={previewImage} alt="Превью" />
              </div>
            )}
          </div>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button 
          type="submit" 
          className="submit-btn"
          disabled={loading}
        >
          {loading ? 'Добавление...' : 'Добавить водителя'}
        </button>
      </form>
      
      {success && (
        <div className="success-notification">
          Водитель успешно добавлен!
          <button 
            className="close-notification"
            onClick={() => setSuccess(false)}
          >
            ×
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default AddDriverForm;