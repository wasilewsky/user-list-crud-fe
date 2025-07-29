import { createBrowserRouter, Link } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import AppLayout from '../layouts/AppLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import Users from '../pages/Users';

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/',
        element: (
          <div className="p-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Welcome!</h1>
            <Link to="/login" className="text-blue-500 underline p-1">Login</Link>
            <Link to="/register" className="text-blue-500 underline p-1">Register</Link>
          </div>
        ),
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
  {
  element: <ProtectedRoute />,
  children: [
    {
      path: '/dashboard',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: 'users',
          element: <Users />
        },
      ],
    },
  ],
},
]);

export default router;
