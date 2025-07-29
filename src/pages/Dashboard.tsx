import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="p-4 text-center">
      <h1 className="text-xl font-bold text-center">Dashboard Page</h1>
      <Link to="users" className="text-blue-500 underline p-1">Users</Link>
    </div>
  );
};

export default Dashboard;
