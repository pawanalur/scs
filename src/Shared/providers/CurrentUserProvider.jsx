import { createContext, useContext, useState, useRef, useEffect } from "react";
import { userService } from "../../mock/services/user.service.mock.js";

import reactLogo from "../../assets/react.svg";

import {
  PHYSICAL_LABEL,
  MENTAL_LABEL,
  DEFAULT_ENERGY_VAL,
  ENERGY_REFRESH_MS,
} from "../components/constants/EnergyDetailConstants.jsx";

const CurrentUserContext = createContext();

export function CurrentUserProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("Test");
  const [physicalEnergy, setPhysicalEnergy] = useState(DEFAULT_ENERGY_VAL);
  const [mentalEnergy, setMentalEnergy] = useState(DEFAULT_ENERGY_VAL);
  const [profileIcon, setProfileIcon] = useState(reactLogo);
  const [inProgressActionID, setInProgressActionID] = useState(null);

  const energyAlertsRef = useRef(null);
  const energyTimerRef = useRef(null);

  const userDetails = {
    userId,
    userName,
    physicalEnergy,
    mentalEnergy,
    inProgressActionID,
    profileIcon,
  };

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

  function resetUserState() {
    setUserId(null);
    setUserName(null);
    setPhysicalEnergy(DEFAULT_ENERGY_VAL);
    setMentalEnergy(DEFAULT_ENERGY_VAL);
    setProfileIcon(reactLogo);
    setInProgressActionID(null);

    energyAlertsRef.current = null;

    if (energyTimerRef.current) {
      clearInterval(energyTimerRef.current);
      energyTimerRef.current = null;
    }
  }

  function refreshUserEnergy() {
    const updated = userService.updateEnergy();
    if (!updated) return;

    setPhysicalEnergy(updated.physicalEnergy);
    setMentalEnergy(updated.mentalEnergy);
  }

  function startEnergyRefreshTimer() {
    if (energyTimerRef.current) {
      clearInterval(energyTimerRef.current);
    }

    energyTimerRef.current = setInterval(() => {
      refreshUserEnergy();
    }, ENERGY_REFRESH_MS);
  }

  async function userLogin(userId) {
    const currUserDetails = await userService.login(userId);

    setUserId(currUserDetails.userId);
    setUserName(currUserDetails.userName);
    setPhysicalEnergy(currUserDetails.physicalEnergy);
    setMentalEnergy(currUserDetails.mentalEnergy);
    setInProgressActionID(currUserDetails.inProgressActionId);

    energyAlertsRef.current = extractEnergyAlerts(currUserDetails);

    startEnergyRefreshTimer();
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
        userLogout,
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
