import sidebarData from "@/assets/SidebarData";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col  w-1/6 h-full fixed border-r-2 bg-gray-50 py-4 cursor cursor-pointer">
      <p
        className="font-bold text-4xl text-center pb-12"
        onClick={() => navigate("/")}
      >
        Anvex Speak
      </p>
      <div>
        {sidebarData.map((data) => (
          <p
            key={data.slug}
            className="hover:bg-gray-300 rounded-md py-2 px-4 cursor-pointer"
            onClick={() => navigate(`/${data.slug}`)}
            role="button"
            tabIndex={0}
          >
            {data.title}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
