import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

const PrivateLayout = () => {
  return (
    <Sidebar>
      <div className="p-4 w-full">
        <Outlet />
      </div>
    </Sidebar>
  );
};

export default PrivateLayout;
