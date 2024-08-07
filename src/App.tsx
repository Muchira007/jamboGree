// src/App.tsx
import React from 'react';
import { RouterProvider, createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Menu from './components/menu/Menu';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Login from './pages/authentication/login/Login';
import Product from './pages/product/Product';
import Products from './pages/products/Products';
import User from './pages/user/User';
import Users from './pages/users/Users';
import './styles/global.scss';
import ForgotPassword from './pages/authentication/forgotPassword/ForgotPassword';
import SignUp from './pages/authentication/signUp/Signup';
import { LandingPage } from './pages/landing-page';
import Status404 from './components/status-pages/Error404';
import ErrorBoundary from './components/status-pages/errorBoundary';
import Wizard from './pages/agent-page/agent';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { AuthProvider } from './contexts/authContexts';
import PrivateRoute from './components/privateRoutes';

const queryClient = new QueryClient();

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/login" />, // Redirect root path to login
    },
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/home',
          element: <PrivateRoute element={<Home />} />,
        },
        {
          path: '/users',
          element: <PrivateRoute element={<Users />} />,
        },
        {
          path: '/products',
          element: <PrivateRoute element={<Products />} />,
        },
        {
          path: '/users/:id',
          element: <PrivateRoute element={<User />} />,
        },
        {
          path: '/products/:id',
          element: <PrivateRoute element={<Product />} />,
        },
        // Add the following line to include the Wizard route:
        {
          path: '/agent',
          element: <PrivateRoute element={<Wizard />} />, // Wrap Wizard with PrivateRoute if needed
        },
      ],
      errorElement: <Status404 />, // Use the Status404 component for errors
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/sign-up',
      element: <SignUp />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />,
    },
    // {
    //   path: '/overview',
    //   element: <LandingPage />,
    // },
    {
      path: '*', // Catch-all route for undefined paths
      element: <Status404 />,
    },
  ]);
  

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
