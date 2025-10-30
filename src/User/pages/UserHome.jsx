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
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1 className="text-3xl underline">User Home Page</h1>
      <p>Information for: {currentUser.fullName}</p>
      <CurrentUser
        key={currentUser.id}
        fullName={currentUser.fullName}
        mentalEnergy={currentUser.mentalEnergy}
        physicalEnergy={currentUser.physicalEnergy}
        profileIcon={currentUser.profileIcon}
      />
      <p>The user's current Task is: {currentUser.inProgressTaskType}</p>
      <p>The user's current Task ID is: {currentUser.inProgressTask}</p>
    </div>
  );
}

export default UserHome;
