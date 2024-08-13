// src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
  const token = Cookies.get('authToken');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
};

export default PrivateRoute;
