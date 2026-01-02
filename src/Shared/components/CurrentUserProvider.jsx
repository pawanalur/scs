import { createContext, useContext, useState, useRef } from "react";
import { userService } from "../../mock/services/user.service.mock";

import reactLogo from "../../assets/react.svg";

const CurrentUserContext = createContext();

export function CurrentUserProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [userName, setuserName] = useState("Test");
  const [physicalEnergy, setPhysicalEnergy] = useState(1000);
  const [mentalEnergy, setMentalEnergy] = useState(1000);
  const [profileIcon, setProfileIcon] = useState(reactLogo);

  const energyAlertsRef = useRef(null);

  function extractEnergyAlerts(loginResult) {
    return {
      warning: {
        lowPhysical: loginResult.warningLowPhysical,
        lowMental: loginResult.warningLowMental,
        highPhysical: loginResult.warningHighPhysical,
        highMental: loginResult.warningHighMental,
      },
      error: {
        lowPhysical: loginResult.errorLowPhysical,
        lowMental: loginResult.errorLowMental,
        highPhysical: loginResult.errorHighPhysical,
        highMental: loginResult.errorHighMental,
      },
    };
  }

  async function userLogin(userId) {
    const currUserDetails = await userService.login(1);
    setUserId(currUserDetails.userId);
    setuserName(currUserDetails.userName);
    setPhysicalEnergy(currUserDetails.physicalEnergy);
    setMentalEnergy(currUserDetails.mentalEnergy);

    energyAlertsRef.current = extractEnergyAlerts(currUserDetails);
  }

  const userDetails = {
    userId,
    userName,
    physicalEnergy,
    mentalEnergy,
    profileIcon,
  };

  return (
    <CurrentUserContext.Provider
      value={{
        userLogin,
        energyAlerts: energyAlertsRef.current,
        currentUser: userDetails,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser() {
  return useContext(CurrentUserContext);
}
