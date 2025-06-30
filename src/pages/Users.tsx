import { useEffect, useState } from 'react';
import axios from '../lib/axios';
import { useNavigate } from 'react-router-dom';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/users')
      .then((res) => setUsers(res.data))
      .catch((err) => {
        if (err.response?.status === 403) {
          navigate('/dashboard');
        } else {
          setError('Failed to load users');
        }
      });
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;