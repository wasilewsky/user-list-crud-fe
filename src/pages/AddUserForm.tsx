import axios from "../lib/axios";
import { useState } from "react";

const AddUserForm = ({ onUserAdded }: { onUserAdded: () => void }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('/users', form);
      onUserAdded();
      setForm({ name: '', email: '', password: '', role: 'user' });
    } catch (err) {
      setError('Failed to create user');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-col gap-2 mb-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2" required />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" className="border p-2" required />
        <select name="role" value={form.role} onChange={handleChange} className="border p-2">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add User</button>
    </form>
  );
};

export default AddUserForm;
