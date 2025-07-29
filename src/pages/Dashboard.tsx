import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="mt-4 space-x-2">
          <Link
            to="users"
            className="inline-block text-blue-600 font-medium hover:underline"
          >
            Go to Users
          </Link>
          <button onClick={handleLogout} className="text-red-500 underline">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
