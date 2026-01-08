import initialEnergyDetails from "../data/energyDetails.json";
import initialUserDetails from "../data/userDetails.json";
import initialEnergyAlerts from "../data/energyAlerts.json";

import {
  PHYSICAL_LABEL,
  MENTAL_LABEL,
  MAX_PHYSICAL_VAL,
  MAX_MENTAL_VAL,
} from "../../Shared/components/constants/EnergyDetailConstants";

let energyDetails = structuredClone(initialEnergyDetails);
let userDetails = structuredClone(initialUserDetails);
let energyAlerts = structuredClone(initialEnergyAlerts);

const currentEnergyState = {
  userId: null,
  physicalEnergy: null,
  mentalEnergy: null,
  physicalDrainPerMin: null,
  mentalDrainPerMin: null,
  lastUpdatedTimestamp: null,
};

function nowIso() {
  return new Date().toISOString();
}

function minutesBetween(fromIso, toIso) {
  const diffMs = new Date(toIso) - new Date(fromIso);
  return Math.max(0, diffMs / 60000);
}

function updateEnergy() {
  if (!currentEnergyState.userId) return null;

  const now = nowIso();
  const minutesPassed = minutesBetween(
    currentEnergyState.lastUpdatedTimestamp,
    now
  );

  if (minutesPassed === 0)
    return {
      physicalEnergy: currentEnergyState.physicalEnergy,
      mentalEnergy: currentEnergyState.mentalEnergy,
    };

  const physicalLoss = minutesPassed * currentEnergyState.physicalDrainPerMin;
  const mentalLoss = minutesPassed * currentEnergyState.mentalDrainPerMin;

  currentEnergyState.physicalEnergy = Math.max(
    0,
    currentEnergyState.physicalEnergy - physicalLoss
  );

  currentEnergyState.mentalEnergy = Math.max(
    0,
    currentEnergyState.mentalEnergy - mentalLoss
  );

  currentEnergyState.lastUpdatedTimestamp = now;

  const energyDetail = energyDetails.find(
    (e) => e.userId === currentEnergyState.userId
  );
  if (energyDetail) {
    energyDetail.physicalEnergy = currentEnergyState.physicalEnergy;
    energyDetail.mentalEnergy = currentEnergyState.mentalEnergy;
    energyDetail.lastUpdated = now;
  }

  return {
    physicalEnergy: currentEnergyState.physicalEnergy,
    mentalEnergy: currentEnergyState.mentalEnergy,
  };
}

function updateSpecificEnergyWithValue(energyType, addedValue) {
  if (!currentEnergyState.userId) return null;

  let newPhysicalEnergy = currentEnergyState.physicalEnergy;
  let newMentalEnergy = currentEnergyState.mentalEnergy;
  let energyToReturn = currentEnergyState.physicalEnergy;
  if (energyType === PHYSICAL_LABEL) {
    newPhysicalEnergy = newPhysicalEnergy + addedValue;
    currentEnergyState.physicalEnergy = Math.max(
      0,
      Math.min(newPhysicalEnergy, MAX_PHYSICAL_VAL)
    );
    energyToReturn = currentEnergyState.physicalEnergy;
  } else if (energyType === MENTAL_LABEL) {
    newMentalEnergy = newMentalEnergy + addedValue;
    currentEnergyState.mentalEnergy = Math.max(
      0,
      Math.min(newMentalEnergy, MAX_MENTAL_VAL)
    );
    energyToReturn = currentEnergyState.mentalEnergy;
  } else return null;

  const energyDetail = energyDetails.find(
    (e) => e.userId === currentEnergyState.userId
  );
  if (energyDetail) {
    energyDetail.physicalEnergy = newPhysicalEnergy;
    energyDetail.mentalEnergy = newMentalEnergy;
  }

  return energyToReturn;
}

async function login(userId = 1) {
  const user = userDetails.find((i) => i.id === userId);
  if (!user) throw new error("User not found!");

  const energyDetail = energyDetails.find((i) => i.userId === userId);
  if (!energyDetail) throw new error("User Energy Detail not found");

  const energyAlert = energyAlerts.find(
    (i) => i.energyAlertId === energyDetail.energyAlertId
  );
  if (!energyAlert) throw new error("User Energy Alert not found");

  energyDetail.lastUpdated = nowIso();

  const loginResult = {
    userId: userId,
    userName: user.fullName,
    inProgressActionId: user.inProgressActionId,
    physicalEnergy: energyDetail.physicalEnergy,
    mentalEnergy: energyDetail.mentalEnergy,
    warningLowPhysical: energyAlert.warningLowPhysical,
    warningLowMental: energyAlert.warningLowMental,
    warningHighPhysical: energyAlert.warningHighPhysical,
    warningHighMental: energyAlert.warningHighMental,
    errorLowPhysical: energyAlert.errorLowPhysical,
    errorLowMental: energyAlert.errorLowMental,
    errorHighPhysical: energyAlert.errorHighPhysical,
    errorHighMental: energyAlert.errorHighMental,
  };

  currentEnergyState.userId = userId;
  currentEnergyState.mentalEnergy = energyDetail.mentalEnergy;
  currentEnergyState.physicalEnergy = energyDetail.physicalEnergy;
  currentEnergyState.lastUpdatedTimestamp = energyDetail.lastUpdated;
  currentEnergyState.mentalDrainPerMin = energyDetail.mentalDrainPerMin;
  currentEnergyState.physicalDrainPerMin = energyDetail.physicalDrainPerMin;

  return loginResult;
}

async function setInProgressAction(actionID) {
  if (!currentEnergyState.userId) return;

  const user = userDetails.find((u) => u.id === currentEnergyState.userId);
  if (user) {
    user.inProgressActionId = actionID;
  }
}

async function clearInProgressAction() {
  await setInProgressAction(null);
}

async function getInProgressActionId() {
  if (!currentEnergyState.userId) return;
  const user = userDetails.find((u) => u.id === currentEnergyState.userId);
  return user.inProgressActionId;
}

function logout() {
  currentEnergyState.userId = null;
  currentEnergyState.physicalEnergy = null;
  currentEnergyState.mentalEnergy = null;
  currentEnergyState.physicalDrainPerMin = null;
  currentEnergyState.mentalDrainPerMin = null;
  currentEnergyState.lastUpdatedTimestamp = null;
}

export const userService = {
  login,
  updateEnergy,
  updateSpecificEnergyWithValue,
  setInProgressAction,
  clearInProgressAction,
  getInProgressActionId,
  logout,
};
