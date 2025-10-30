import reactLogo from "../../assets/react.svg";
import backgroundImage from "../../assets/UserHome_Background.png";
import CurrentUser from "../components/CurrentUser";

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
      <div className="relative w-full h-full p-[2%] flex flex-col gap-[5%]">
        {/* Top box */}
        <div className="h-[15%] bg-white/90 backdrop-blur-sm rounded-xl p-3 py-3 shadow-lg item-center">
          <CurrentUser
            key={currentUser.id}
            fullName={currentUser.fullName}
            mentalEnergy={currentUser.mentalEnergy}
            physicalEnergy={currentUser.physicalEnergy}
            profileIcon={currentUser.profileIcon}
          />
        </div>

        {/* Bottom row */}
        <div className="flex flex-row gap-[2%] h-[80%]">
          {/* Left box */}
          <div className="w-[70%] bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold">Left Box</h2>
            <p>The user's current Task is: {currentUser.inProgressTaskType}</p>
            <p>The user's current Task ID is: {currentUser.inProgressTask}</p>
          </div>

          {/* Right box */}
          <div className="w-[30%] bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold">Right Box</h2>
            <p>Sidebar or stats content</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
