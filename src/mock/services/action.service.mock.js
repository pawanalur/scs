import initialActions from "../data/actions.json";
import initialActionDetails from "../data/actionDetails.json";
import initialEatDetails from "../data/eatDetails.json";
import initialExerciseDetails from "../data/exerciseDetails.json";
import initialSleepDetails from "../data/sleepDetails.json";

import { userService } from "./user.service.mock";
import {
  EAT_TYPE,
  SLEEP_TYPE,
  EXERCISE_TYPE,
} from "../../Shared/components/constants/ActionTypeConstants";
import {
  MENTAL_LABEL,
  PHYSICAL_LABEL,
  SLEEP_ENERGY_GAIN,
} from "../../Shared/components/constants/EnergyDetailConstants";

/**
 * In-memory "DB"
 * These mutate just like a real backend would
 */
let actions = structuredClone(initialActions);
let actionDetails = structuredClone(initialActionDetails);
let eatDetails = structuredClone(initialEatDetails);
let exerciseDetails = structuredClone(initialExerciseDetails);
let sleepDetails = structuredClone(initialSleepDetails);

/**
 * Helpers
 */
function generateId(list, key) {
  return Math.max(0, ...list.map((i) => i[key])) + 1;
}

function getDetailsByActionId(actionId) {
  return actionDetails.find((d) => d.actionId === actionId) || null;
}

function mapAdditionalDetailsToDb(additionalDetailsArray) {
  const result = {};

  additionalDetailsArray.forEach((item, index) => {
    const i = index + 1;
    result[`additionalKey${i}`] = item.key || "";
    result[`additionalValue${i}`] = item.value || "";
  });

  return result;
}

function normalizeAdditionalDetails(detailsArray) {
  const map = {};

  detailsArray.forEach(({ key, value }) => {
    if (!key) return;
    map[key.trim().toLowerCase()] = value;
  });

  return map;
}

function buildEatDetails(detailsMap) {
  return {
    calorieConsumed: Number(detailsMap["calories"] || 0),
    sugarConsumed: Number(detailsMap["sugar(g)"] || 0),
    proteinConsumed: Number(detailsMap["protein(g)"] || 0),
    physicalEnergyChange: Number(detailsMap["calories"] || 0),
  };
}

function buildExerciseDetails(detailsMap) {
  return {
    calorieBurnt: Number(detailsMap["calories"] || 0),
    type: detailsMap["type"] || "Unknown",
    physicalEnergyChange: -Number(detailsMap["calories"] || 0),
  };
}

function buildSleepDetails(detailsMap) {
  return {
    mentalEnergyChange: Number(detailsMap["mental energy"] || 25),
  };
}

async function CreateAction({
  userId,
  actionType,
  actionTitle,
  actionDescription,
  startAt,
}) {
  const actionId = generateId(actions, "actionId");

  const newAction = {
    actionId,
    userId,
    actionType,
    startAt,
    endAt: null,
    duration: null,
    createdAt: new Date().toISOString(),
    isDiscarded: false,
  };

  actions.push(newAction);
  await userService.setInProgressAction(actionId);

  actionDetails.push({
    actionDetailId: generateId(actionDetails, "actionDetailId"),
    actionId,
    title: actionTitle,
    description: actionDescription,
    additionalKey1: "",
    additionalValue1: "",
    additionalKey2: "",
    additionalValue2: "",
    additionalKey3: "",
    additionalValue3: "",
  });

  return structuredClone(newAction);
}

async function GetActionById(actionId) {
  const action = actions.find((a) => a.actionId === actionId);
  if (!action) return null;

  return {
    ...action,
    details: getDetailsByActionId(actionId),
  };
}

async function GetInProgressAction() {
  const currentActionID = await userService.getInProgressActionId();
  if (!currentActionID) return null;

  return await GetActionById(currentActionID);
}

async function UpdateActionDetails(
  actionId,
  { description, additionalDetailsArray }
) {
  const index = actionDetails.findIndex((d) => d.actionId === actionId);
  if (index === -1) throw new Error("Action details not found");

  actionDetails[index] = {
    ...actionDetails[index],
    description,
    ...mapAdditionalDetailsToDb(additionalDetailsArray),
  };

  return structuredClone(actionDetails[index]);
}

async function DiscardAction(actionId) {
  const action = actions.find((a) => a.actionId === actionId);
  if (!action) throw new Error("Action not found");

  action.isDiscarded = true;
  action.endAt = null;
  action.duration = null;

  await userService.clearInProgressAction();
  return structuredClone(action);
}

async function EndAction(actionId, endAt) {
  const action = actions.find((a) => a.actionId === actionId);
  if (!action) throw new Error("Action not found");

  if (!action.endAt) action.endAt = endAt;
  action.duration = (new Date(endAt) - new Date(action.startAt)) / 60000;
  return structuredClone(action);
}

async function SubmitAction(
  actionId,
  { description, actionAdditionalDetails }
) {
  const action = actions.find((a) => a.actionId === actionId);
  if (!action) throw new Error("Action not found");

  await UpdateActionDetails(actionId, {
    description,
    additionalDetailsArray: actionAdditionalDetails,
  });

  const detailsMap = normalizeAdditionalDetails(actionAdditionalDetails);

  if (action.actionType === EAT_TYPE) {
    const eatDetailResult = buildEatDetails(detailsMap);
    const { calorieConsumed } = eatDetailResult;

    eatDetails.push({
      eatId: generateId(eatDetails, "eatId"),
      actionId,
      ...eatDetailResult,
    });
    userService.updateSpecificEnergyWithValue(PHYSICAL_LABEL, calorieConsumed);
  }

  if (action.actionType === EXERCISE_TYPE) {
    const exerciseDetailResult = buildExerciseDetails(detailsMap);
    const { calorieBurnt } = exerciseDetailResult;

    exerciseDetails.push({
      exerciseId: generateId(exerciseDetails, "exerciseId"),
      actionId,
      ...exerciseDetailResult,
    });

    userService.updateSpecificEnergyWithValue(
      PHYSICAL_LABEL,
      -1 * calorieBurnt
    );
  }

  if (action.actionType === SLEEP_TYPE) {
    const sleepDetailResult = buildSleepDetails(detailsMap);
    sleepDetails.push({
      sleepId: generateId(sleepDetails, "sleepId"),
      actionId,
      ...sleepDetailResult,
    });

    userService.updateSpecificEnergyWithValue(MENTAL_LABEL, SLEEP_ENERGY_GAIN);
  }

  await userService.clearInProgressAction();
  return structuredClone(action);
}

function computeEnergyChange(action) {
  if (action.sleep?.mentalEnergyChange != null)
    return action.sleep.mentalEnergyChange;

  if (action.eat?.physicalEnergyChange != null)
    return action.eat.physicalEnergyChange;

  if (action.exercise?.physicalEnergyChange != null)
    return action.exercise.physicalEnergyChange;

  return null;
}

function mapActionToLogEntry(action) {
  return {
    id: action.actionId,
    title: action.details?.title || "Untitled",
    startAt: action.startAt,
    endAt: action.endAt,
    energyChange: computeEnergyChange(action),
  };
}

function detectEnergyDomain(action) {
  if (action.actionType == SLEEP_TYPE) return MENTAL_LABEL;

  if (action.actionType == EAT_TYPE || action.actionType == EXERCISE_TYPE)
    return PHYSICAL_LABEL;

  return null;
}

async function GetActionsByEnergyType(userId, filterType = null) {
  let toReturnActions = actions
    .filter((a) => a.userId === userId && !a.isDiscarded)
    .map((action) => ({ ...action, energyDomain: detectEnergyDomain(action) }))
    .filter((a) => filterType === null || a.energyDomain === filterType)
    .map((action) => ({
      ...action,
      details: getDetailsByActionId(action.actionId),
      sleep: sleepDetails.find((s) => s.actionId === action.actionId) || null,
      eat: eatDetails.find((e) => e.actionId === action.actionId) || null,
      exercise:
        exerciseDetails.find((e) => e.actionId === action.actionId) || null,
    }))
    .map(mapActionToLogEntry)
    .sort((a, b) => new Date(b.startAt) - new Date(a.startAt));
  return toReturnActions;
}

export const actionService = {
  CreateAction,
  UpdateActionDetails,
  DiscardAction,
  EndAction,
  SubmitAction,
  GetInProgressAction,
  GetActionsByEnergyType,
};
