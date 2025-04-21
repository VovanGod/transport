import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { routes } from './routes.jsx';

const Pages = () => {
    const location = useLocation();
    return (
        <Routes location={location} key={location.pathname}>
            {routes.map((route, index) => (
                <Route 
                    key={index}
                    path={route.path} 
                    element={route.element}
                />
            ))}
        </Routes>
    );
};

export default Pages;