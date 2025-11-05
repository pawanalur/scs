import TopBar from "../components/TopBar";
import Sidebar from "../components/SideBar";

import reactLogo from "../../assets/react.svg";
import backgroundImage from "../../assets/UserHome_Background.png";

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
        <div className="flex flex-col md:flex-row gap-[2%] h-[85%] relative">
          {/* Left box */}
          <div
            className="md:w-[70%] w-full bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg order-1 
                  overflow-y-auto md:mb-0 mb-[110px]"
          >
            <h2 className="text-xl font-semibold">Left Box</h2>
            <p>The user's current Task is: {currentUser.inProgressTaskType}</p>
            <p>The user's current Task ID is: {currentUser.inProgressTask}</p>
            {/* Example long content */}
            <div className="space-y-4 mt-4">
              {[...Array(20)].map((_, i) => (
                <p key={i}>Scrollable content line {i + 1}</p>
              ))}
            </div>
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
