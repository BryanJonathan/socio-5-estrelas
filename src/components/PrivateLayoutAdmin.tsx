import { Outlet } from "react-router-dom";

const PrivateLayout = () => {
  return (
    <div className="w-full">
      <Outlet />
    </div>
  );
};

export default PrivateLayout;
