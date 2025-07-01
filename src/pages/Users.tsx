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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedUser, setEditedUser] = useState({name: '', email: '', role: 'user'});
  const navigate = useNavigate();

  const fetchUsers = () => {
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
  };
  
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (user: User) => {
    setEditingId(user.id);
    setEditedUser({ name: user.name, email: user.email, role: user.role });
  };

  const handleSave = async (id: string) => {
    try {
      await axios.patch(`/users/${id}`, editedUser);
      setEditingId(null);
      fetchUsers();
    } catch {
      alert('Failed to update user');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await axios.delete(`/users/${id}`);
      alert(res.data.message);
      fetchUsers();
    } catch (err) {
      alert("Failed to delete user");
    }
  };

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
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => 
            editingId === u.id ? (
              <tr key={u.id}>
                <td className="border p-2">
                  <input 
                    value={editedUser.name}
                    onChange={(e) => 
                      setEditedUser({ ...editedUser, name: e.target.value })
                    }
                    className="border px-2 py-1"
                  />
                </td>
                <td className="border p-2">
                  <input 
                    value={editedUser.email}
                    onChange={(e) => 
                      setEditedUser({ ...editedUser, email: e.target.value })
                    }
                    className="border px-2 py-1"
                  />
                </td>
                <td className="border p-2">
                  <select 
                    value={editedUser.role}
                    onChange={(e) => 
                      setEditedUser({ ...editedUser, role: e.target.value })
                    }
                    className="border px-2 py-1"
                  >
                    <option value={'user'}>User</option>
                    <option value={'admin'}>Admin</option>
                  </select>
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleSave(u.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-300 px-2 py-1 rounded"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={u.id}>
                <td className="border p-2">{u.name}</td>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2">{u.role}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEditClick(u)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;