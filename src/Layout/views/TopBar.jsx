import { useNavigate } from "react-router-dom";

import Button from "../../Shared/components/Button";
import MobileMenuButton from "../components/MobileMenuButton";
import { useCurrentUser } from "../../Shared/components/CurrentUserProvider";
import {
  SLEEP_TYPE,
  EAT_TYPE,
  EXERCISE_TYPE,
} from "../../Shared/components/Constants/ActionTypeConstants";

import {
  MAX_MENTAL_VAL,
  MAX_PHYSICAL_VAL,
  PHYSICAL_LABEL,
  MENTAL_LABEL,
} from "../../Shared/components/Constants/EnergyDetailConstants.jsx";

function TopBar() {
  const navigate = useNavigate();

  const { currentUser, energyAlerts } = useCurrentUser();
  const { userName, mentalEnergy, physicalEnergy, profileIcon } = currentUser;

  const getEnergyColor = (value, energyType) => {
    if (!energyAlerts) return "bg-green-500";

    const { warningLow, warningHigh, errorLow, errorHigh } =
      energyAlerts[energyType];

    if (value <= errorLow || value >= errorHigh) {
      return "bg-red-500";
    }

    if (value <= warningLow || value >= warningHigh) {
      return "bg-yellow-400";
    }

    return "bg-green-500";
  };

  const renderBar = (label, value, max = 1000) => (
    <div className="flex items-center gap-2 text-sm font-semibold mb-1 h-5">
      <div className="w-30 text-sm font-semibold">{label}:</div>

      <div className="w-[30vw] h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getEnergyColor(
            value,
            label
          )} rounded-full transition-all duration-300`}
          style={{ width: `${(value / max) * 100}%` }}
        ></div>
      </div>
      <div className="text-sm font-semibold w-10 text-right">
        {Math.floor(value)}
      </div>
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
            {renderBar(MENTAL_LABEL, mentalEnergy, MAX_MENTAL_VAL)}
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
            {renderBar(PHYSICAL_LABEL, physicalEnergy, MAX_PHYSICAL_VAL)}
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
