import { useNavigate } from "react-router-dom";

import Button from "../../Shared/components/Button";
import MobileMenuButton from "../components/MobileMenuButton";
import { useCurrentUser } from "../../Shared/components/CurrentUserProvider";
import {
  SLEEP_TYPE,
  EAT_TYPE,
  EXERCISE_TYPE,
} from "../../Shared/components/ActionTypeConstants";

function TopBar() {
  const navigate = useNavigate();

  const { currentUser } = useCurrentUser();
  const { userName, mentalEnergy, physicalEnergy, profileIcon } = currentUser;
  console.log("Current User: ", currentUser);
  console.log("Full Name: ", userName);

  // Helper function to choose color TODO CHANGE TO CORRECT FORMULA
  const getEnergyColor = (value, max = 1000) => {
    const percent = (value / max) * 100;
    if (percent > 70) return "bg-green-500";
    if (percent > 30) return "bg-yellow-400";
    return "bg-red-500";
  };

  const renderBar = (label, value, max = 1000) => (
    <div className="flex items-center gap-2 text-sm font-semibold mb-1 h-5">
      <div className="w-30 text-sm font-semibold">{label}:</div>

      <div className="w-[30vw] h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getEnergyColor(
            value,
            max
          )} rounded-full transition-all duration-300`}
          style={{ width: `${(value / max) * 100}%` }}
        ></div>
      </div>
      <div className="text-sm font-semibold w-10 text-right">{value}</div>
    </div>
  );

  const buttonClasses = "py-0 h-5 w-40 hidden md:inline-flex";

  return (
    <div className="flex items-center gap-4">
      <div className="shrink-0">
        <img
          src={profileIcon}
          alt={userName}
          className="w-16 h-16 rounded-md border-2 border-white shadow-md"
        />
      </div>

      <div className="flex flex-col gap-2 grow">
        <h3 className="text-lg font-semibold mb-2">Name: {userName}</h3>

        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            {renderBar("Mental Energy", mentalEnergy, 100)}
            <Button
              label="Sleep"
              className={buttonClasses}
              styleVariant="black"
              onClick={() =>
                navigate("/home", { state: { actionType: SLEEP_TYPE } })
              }
            />
          </div>

          <Button
            label="View Log"
            className={buttonClasses}
            styleVariant="green"
            onClick={() => navigate("/home/mental-log")}
          />
        </div>

        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            {renderBar("Physical Energy", physicalEnergy, 2000)}
            <Button
              label="Eat"
              className={buttonClasses}
              styleVariant="black"
              onClick={() =>
                navigate("/home", { state: { actionType: EAT_TYPE } })
              }
            />
            <Button
              label="Exercise"
              className={buttonClasses}
              styleVariant="black"
              onClick={() =>
                navigate("/home", { state: { actionType: EXERCISE_TYPE } })
              }
            />
          </div>

          <Button
            label="View Log"
            className={buttonClasses}
            styleVariant="green"
            onClick={() => navigate("/home/physical-log")}
          />
        </div>
      </div>
      <MobileMenuButton />
    </div>
  );
}

export default TopBar;
