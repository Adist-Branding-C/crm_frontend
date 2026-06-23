import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div className="task-settings-page">
      <Outlet />
    </div>
  );
};

export default UserLayout;
