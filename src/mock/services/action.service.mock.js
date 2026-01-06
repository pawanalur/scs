import initialActions from "../data/actions.json";
import initialActionDetails from "../data/actionDetails.json";
import initialEatDetails from "../data/eatDetails.json";
import initialExerciseDetails from "../data/exerciseDetails.json";
import initialSleepDetails from "../data/sleepDetails.json";
import { EAT_TYPE, SLEEP_TYPE, EXERCISE_TYPE } from "../../Shared/components/Constants/ActionTypeConstants";

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
  return Math.max(0, ...list.map(i => i[key])) + 1;
}

function getDetailsByActionId(actionId) {
  return actionDetails.find(d => d.actionId === actionId) || null;
}

function mapAdditionalDetailsToDb(additionalDetailsArray) {
  const result = {};

  console.log(additionalDetailsArray)
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

async function CreateAction({ userId, actionType, actionTitle, actionDescription, startAt }) {
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

  console.log("New Action: ", newAction)
  console.log("Updated ActionDetails: ", actionDetails)

  return structuredClone(newAction);
}

async function UpdateActionDetails(actionId, {description, additionalDetailsArray}) {
  const index = actionDetails.findIndex(d => d.actionId === actionId);
  if (index === -1) throw new Error("Action details not found");

  actionDetails[index] = {
    ...actionDetails[index],
    description,
    ...mapAdditionalDetailsToDb(additionalDetailsArray),
  };

  console.log("New ActionDetails: ", actionDetails[index])
  return structuredClone(actionDetails[index]);
}

async function DiscardAction(actionId) {
  const action = actions.find(a => a.actionId === actionId);
  if (!action) throw new Error("Action not found");

  action.isDiscarded = true;
  action.endAt = null;
  action.duration = null;

  console.log("Updated Action: ", action)

  return structuredClone(action);
}

async function SubmitAction(actionId, {
  endAt,
  description,
  actionAdditionalDetails,
}) {
  const action = actions.find(a => a.actionId === actionId);
  if (!action) throw new Error("Action not found");

  action.endAt = endAt;
  action.duration =
    (new Date(endAt) - new Date(action.startAt)) / 60000;

  await UpdateActionDetails(actionId, {
    description,
    additionalDetailsArray: actionAdditionalDetails,
  });

  const detailsMap = normalizeAdditionalDetails(actionAdditionalDetails);
  console.log("Action Type: ", action.actionType)

  if (action.actionType === EAT_TYPE) {
    eatDetails.push({
      eatId: generateId(eatDetails, "eatId"),
      actionId,
      ...buildEatDetails(detailsMap),
    });
    console.log("Eating...", eatDetails)
  }

  if (action.actionType === EXERCISE_TYPE) {
    exerciseDetails.push({
      exerciseId: generateId(exerciseDetails, "exerciseId"),
      actionId,
      ...buildExerciseDetails(detailsMap),
    });
    console.log("Exercising..", exerciseDetails)
  }

  if (action.actionType === SLEEP_TYPE) {
    sleepDetails.push({
      sleepId: generateId(sleepDetails, "sleepId"),
      actionId,
      ...buildSleepDetails(detailsMap),
    });
    console.log("Sleeping..", sleepDetails)
  }

  return structuredClone(action);
}


async function GetMentalActions(userId) {
  return actions
    .filter(
      a =>
        a.userId === userId &&
        a.actionType === "Sleep" &&
        !a.isDiscarded
    )
    .map(action => ({
      ...action,
      details: getDetailsByActionId(action.actionId),
      sleep: sleepDetails.find(s => s.actionId === action.actionId) || null,
    }));
}

async function GetPhysicalActions(userId) {
  return actions
    .filter(
      a =>
        a.userId === userId &&
        (a.actionType === "Eat" || a.actionType === "Exercise") &&
        !a.isDiscarded
    )
    .map(action => ({
      ...action,
      details: getDetailsByActionId(action.actionId),
      eat:
        action.actionType === "Eat"
          ? eatDetails.find(e => e.actionId === action.actionId)
          : null,
      exercise:
        action.actionType === "Exercise"
          ? exerciseDetails.find(e => e.actionId === action.actionId)
          : null,
    }));
}

export const actionService = {
  CreateAction,
  UpdateActionDetails,
  DiscardAction,
  SubmitAction,
  GetMentalActions,
  GetPhysicalActions,
};
