import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/UserLogin_Signup_Background.png";
import Button from "../../Shared/components/Button";
import { useCurrentUser } from "../../Shared/providers/CurrentUserProvider";

function Login() {
  const navigate = useNavigate();
  const { userLogin } = useCurrentUser();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleLogin = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      setIsSubmitting(true);
      await userLogin(username, password);
      navigate("/home");
    } catch (err) {
      setErrors({ general: "Login failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = () => {
    navigate("/signup");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-white w-[350px] p-8 rounded-md shadow-xl">
        <h2 className="text-2xl font-semibold text-center mb-6">LOG IN</h2>
        {errors.general && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {errors.general}
          </p>
        )}

        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-600">Username</label>
          <input
            type="text"
            placeholder="johndoe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1 text-gray-600">Password</label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <Button
          onClick={handleLogin}
          className="w-full py-2 mb-4 rounded-md transition"
          styleVariant="black"
          label="Login"
        />

        <Button
          onClick={handleRegister}
          className="w-full py-2 mb-4 rounded-md transition"
          styleVariant="green"
          label="Register"
        />
      </div>
    </div>
  );
}

export default Login;
