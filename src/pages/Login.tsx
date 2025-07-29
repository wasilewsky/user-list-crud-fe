import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from '../lib/axios';
import { Navigate, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginData = z.infer<typeof loginSchema>;

const Login = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" />;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: LoginData) => {
    try {
      const res = await axios.post('/auth/login', data);
      const token = res.data.token;
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              {...register('email')}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              {...register('password')}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
