import { Outlet, RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Menu from './components/menu/Menu';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Product from './pages/product/Product';
import Products from './pages/products/Products';
import User from './pages/user/User';
import Users from './pages/users/Users';
import './styles/global.scss';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import SignUp from './components/signUp/Signup';
import { LandingPage } from './pages/landing-page';
import Status404 from './components/status-pages/Error404';
import ErrorBoundary from './components/status-pages/errorBoundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  // Layout
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            {/* render dynamically children components */}
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  // navigation
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
          element: <Home />,
        },
        {
          path: '/users',
          element: <Users />,
        },
        {
          path: '/products',
          element: <Products />,
        },
        {
          path: '/users/:id',
          element: <User />,
        },
        {
          path: '/products/:id',
          element: <Product />,
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
    {
      path: '/overview',
      element: <LandingPage />,
    },
    {
      path: '*', // Catch-all route for undefined paths
      element: <Status404 />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
