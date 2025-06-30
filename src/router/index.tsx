import { createBrowserRouter } from 'react-router-dom';
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
