import sidebarData from "@/assets/SidebarData";
import { sidebarFoot } from "@/assets/SidebarData";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-between w-1/6 h-full fixed border-r-2 bg-gray-50 py-4 pb-0 cursor cursor-pointer">
      <div className="">
        <img
          src="anvex-logo-png.png"
          alt="Anvex Speak"
          className="w-auto h-full mx-auto object-contain cursor-pointer px-4"
          onClick={() => navigate("/")}
        />
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
      <div>
        {sidebarFoot.map((data) => (
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
        <p className="px-4 text-sm  font-mono bg-white text-gray-600 text-center">
          <p className="flex px-4 items-center">
            <span className="pr-2">A product of</span>
            <img src="vcs-logo-red.jpg" alt="vcs logo" className="w-8" />
          </p>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
