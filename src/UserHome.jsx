import TopBar from "./Layout/views/TopBar";
import Sidebar from "./Layout/views/SideBar";
import { Outlet } from "react-router-dom";

import reactLogo from "./assets/react.svg";
import backgroundImage from "./assets/UserHome_Background.png";
import "./UserHome.css";

function UserHome(props) {
  const GUEST = {
    id: "guest",
    fullName: "Guest User",
    mentalEnergy: 100,
    physicalEnergy: 1000,
    profileIcon: reactLogo,
    inProgressTask: 10,
    inProgressTaskType: "Sleep",
  };

  const currentUser = props.currentUser || GUEST;

  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
      id="menu-hook"
    >
      {/* Content container */}
      <div className="relative w-full h-full p-[2%] flex flex-col gap-[2%]">
        {/* Top box */}
        <div className="h-[15%] bg-white/90 backdrop-blur-sm rounded-xl p-3 py-3 shadow-lg item-center">
          <TopBar
            key={currentUser.id}
            fullName={currentUser.fullName}
            mentalEnergy={currentUser.mentalEnergy}
            physicalEnergy={currentUser.physicalEnergy}
            profileIcon={currentUser.profileIcon}
          />
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row gap-[2%] h-[85%] relative min-h-0">
          {/* Left box */}
          <div
            className="md:w-[70%] w-full bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg order-1 
                  md:mb-0 mb-[110px] mainbar"
          >
            <Outlet />
          </div>

          {/* Right box */}
          <div
            className="md:static fixed bottom-0 left-0 md:w-[30%] w-full bg-white/50 backdrop-blur-sm 
                  rounded-t-xl md:rounded-xl p-6 shadow-lg order-2"
          >
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
