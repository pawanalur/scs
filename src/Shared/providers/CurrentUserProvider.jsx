import { createContext, useContext, useState, useRef, useEffect } from "react";
import { userService } from "../../mock/services/user.service.mock.js";

import reactLogo from "../../assets/react.svg";

import {
  PHYSICAL_LABEL,
  MENTAL_LABEL,
} from "../components/Constants/EnergyDetailConstants.jsx";

const CurrentUserContext = createContext();

export function CurrentUserProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [userName, setuserName] = useState("Test");
  const [physicalEnergy, setPhysicalEnergy] = useState(1000);
  const [mentalEnergy, setMentalEnergy] = useState(1000);
  const [profileIcon, setProfileIcon] = useState(reactLogo);
  const [inProgressActionID, setInProgressActionID] = useState(null);

  const energyAlertsRef = useRef(null);
  const energyTimerRef = useRef(null);

  function extractEnergyAlerts(loginResult) {
    return {
      [PHYSICAL_LABEL]: {
        warningLow: loginResult.warningLowPhysical,
        warningHigh: loginResult.warningHighPhysical,
        errorLow: loginResult.errorLowPhysical,
        errorHigh: loginResult.errorHighPhysical,
      },
      [MENTAL_LABEL]: {
        warningLow: loginResult.warningLowMental,
        warningHigh: loginResult.warningHighMental,
        errorLow: loginResult.errorLowMental,
        errorHigh: loginResult.errorHighMental,
      },
    };
  }

  function refreshUserEnergy() {
    const updated = userService.updateEnergy();
    if (!updated) return;

    setPhysicalEnergy(updated.physicalEnergy);
    setMentalEnergy(updated.mentalEnergy);
  }

  async function userLogin(userId) {
    const currUserDetails = await userService.login(1);
    setUserId(currUserDetails.userId);
    setuserName(currUserDetails.userName);
    setPhysicalEnergy(currUserDetails.physicalEnergy);
    setMentalEnergy(currUserDetails.mentalEnergy);
    setInProgressActionID(currUserDetails.inProgressActionId);

    energyAlertsRef.current = extractEnergyAlerts(currUserDetails);

    if (energyTimerRef.current) {
      clearInterval(energyTimerRef.current);
    }

    energyTimerRef.current = setInterval(() => {
      const updated = userService.updateEnergy();
      if (!updated) return;

      setPhysicalEnergy(updated.physicalEnergy);
      setMentalEnergy(updated.mentalEnergy);
    }, 10000);
  }

  const userDetails = {
    userId,
    userName,
    physicalEnergy,
    mentalEnergy,
    profileIcon,
  };

  function resetUserState() {
    setUserId(null);
    setuserName(null);
    setPhysicalEnergy(null);
    setMentalEnergy(null);
    setProfileIcon(reactLogo);
    setInProgressActionID(null);

    energyAlertsRef.current = null;

    if (energyTimerRef.current) {
      clearInterval(energyTimerRef.current);
      energyTimerRef.current = null;
    }
  }

  function userLogout() {
    userService.logout();
    resetUserState();
  }

  return (
    <CurrentUserContext.Provider
      value={{
        userLogin,
        refreshUserEnergy,
        inProgressActionID,
        energyAlerts: energyAlertsRef.current,
        currentUser: userDetails,
        userLogout,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser() {
  return useContext(CurrentUserContext);
}
