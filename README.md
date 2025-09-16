# 🚗 Car Rental System

> Полноценная система аренды автомобилей с админ-панелью и API.  
Проект реализован с использованием современных технологий: React + Express + PostgreSQL.

---

## 🧾 Описание

Car Rental System — это веб-приложение, позволяющее пользователям:
- Просматривать список доступных автомобилей
- Регистрироваться и входить в систему
- Бронировать автомобили
- Просматривать историю бронирований

Администратор имеет возможность:
- Управлять списком автомобилей (добавлять, удалять)
- Просматривать список заявок
- Контролировать статусы бронирований

---

## 🔧 Технологический стек

### Frontend
- [React](https://react.dev/) + [Vite](https://vitejs.dev/) — для быстрой сборки интерфейса
- [SCSS](https://sass-lang.com/) — для стилизации
- [Axios](https://axios-http.com/) — для работы с API

### Backend
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) — серверная часть
- [PostgreSQL](https://www.postgresql.org/) — база данных

### Админ-панель
- Логин: `admin`  
- Пароль: `12345`

---

## 🗃️ Структура базы данных

### Таблицы базы данных

```sql
car_rental=# \dt
List of relations
Schema | Name | Type | Owner  
---|---|---|---
public | cars | table | postgres
public | drivers | table | postgres  
public | orders | table | postgres
public | taxi_orders | table | postgres
public | users | table | postgres
```

#### 1. Таблица cars - Автомобили
```sql
CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    transmission VARCHAR(20),
    model VARCHAR(100),
    power INTEGER,
    price_per_day DECIMAL(10,2),
    image_url TEXT
);
```

#### 2. Таблица drivers - Водители
```sql
CREATE TABLE drivers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    experience INTEGER,
    image_url TEXT
);
```

#### 3. Таблица orders - Заказы аренды
```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    phone VARCHAR(20),
    comment TEXT,
    car_id INTEGER REFERENCES cars(id),
    car_model VARCHAR(100),
    car_price DECIMAL(10,2),
    created_at TIMESTAMP
);
```

#### 4. Таблица taxi_orders - Такси заказы
```sql
CREATE TABLE taxi_orders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    phone VARCHAR(20),
    from_address TEXT,
    to_address TEXT,
    car_type VARCHAR(50),
    created_at TIMESTAMP
);
```

#### 5. Таблица users - Пользователи
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE,
    email VARCHAR(100) UNIQUE,
    password_hash VARCHAR(255),
    is_admin BOOLEAN DEFAULT false
);
```
- создайте админа
```sql
id | username | email | password_hash | is_admin
1 | admin | admin@example.com | 12345 | true
```

#### Добавьте тестовые данные
```sql
-- Добавление пользователей
INSERT INTO users (username, email, password_hash, is_admin) VALUES
('admin', 'admin@example.com', '12345', true),
('misha', 'example@yandex.ru', '1221', false),
('stas', 'example2@yandex.ru', '1221', false);

-- Добавление автомобилей
INSERT INTO cars (transmission, model, power, price_per_day, image_url) VALUES
('Automatic', 'Omoda C5', 147, 3600.00, 'https://example.com/omoda-c5.webp'),
('Automatic', 'Geely Coolray New', 138, 3400.00, 'https://example.com/coolray-new.webp'),
('Diesel', 'Mercedes VIAMO', 172, 4400.00, 'https://example.com/van-02-s.webp');

-- Добавление водителей
INSERT INTO drivers (name, experience, image_url) VALUES
('Vladimir', 12, 'driver1.jpg'),
('Anna', 3, 'driver2.jpg'),
('Michael', 7, 'driver3.jpg');
```

---

## 🚀 Установка и запуск

### 1. Клонируйте репозиторий:
```bash
git clone https://github.com/VovanGod/transport.git
cd transport
```

### Запуск фронтенда
```bash
cd client
npm install
npm run dev
```

### Запуск бекенда
```bash
cd server
npm install
npm run server
```
