import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* dodam navbar */}
      <Outlet />
    </div>
  );
};

export default AppLayout;
