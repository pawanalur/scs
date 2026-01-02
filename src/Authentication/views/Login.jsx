import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/UserLogin_Signup_Background.png";
import { useCurrentUser } from "../../Shared/components/CurrentUserProvider";

function Login() {
  const navigate = useNavigate();
  const { userLogin } = useCurrentUser();

  const handleGuestStart = () => {
    userLogin(1);
    navigate("/home");
  };
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <button
        onClick={handleGuestStart}
        className="px-6 py-3 text-lg font-semibold rounded-md
                   bg-black/80 text-white hover:bg-black
                   transition-colors shadow-lg"
      >
        Start Demo as Guest
      </button>
    </div>
  );
}

export default Login;
