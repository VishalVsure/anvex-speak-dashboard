import sidebarData from "@/assets/SidebarData";
import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-1/6 h-full fixed border-r-2">
      {sidebarData.map((data) => (
        <p
          className="hover:bg-gray-200 hover:rounded-md py-2 px-4"
          onClick={() => navigate(`/${data.slug}`)}
        >
          {data.title}
        </p>
      ))}
    </div>
  );
};

export default Sidebar;
