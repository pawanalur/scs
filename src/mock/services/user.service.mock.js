import initialEnergyDetails from "../data/energyDetails.json";
import initialUserDetails from "../data/userDetails.json";
import initialEnergyAlerts from "../data/energyAlerts.json";

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
  return Math.max(0, diffMs / 1000);
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

export const userService = {
  login,
  updateEnergy,
};
