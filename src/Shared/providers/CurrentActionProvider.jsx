import { createContext, useContext, useEffect, useState, useRef } from "react";
import { actionService } from "../../mock/services/action.service.mock";

import { useCurrentUser } from "./CurrentUserProvider";
import {
  GENERIC_TYPE,
  ACTION_TYPES,
  KEY_LABEL,
  VALUE_LABEL,
} from "../components/Constants/ActionTypeConstants";

const CurrentActionContext = createContext();

export function CurrentActionProvider({ children }) {
  const [actionId, setActionId] = useState(null);
  const [actionType, setActionType] = useState(GENERIC_TYPE);
  const [startAt, setStartAt] = useState(null);
  const [endAt, setEndAt] = useState(null);

  const [actionDetails, setActionDetails] = useState({
    title: "",
    description: "",
  });

  const [actionAdditionalDetails, setActionAdditionalDetails] = useState(
    structuredClone(
      ACTION_TYPES.find((item) => item.id === actionType)
        ?.actionAdditionalDetailDefault
    )
  );

  const { refreshUserEnergy, inProgressActionID } = useCurrentUser();
  const hasRestoredRef = useRef(false);

  useEffect(() => {
    if (!inProgressActionID || hasRestoredRef.current) return;

    hasRestoredRef.current = true;
    restoreInProgressAction();
  }, [inProgressActionID]);

  function resetAction() {
    setActionId(null);
    setActionDetails({
      title: "",
      description: "",
    });

    setActionType(GENERIC_TYPE);

    setActionAdditionalDetails(
      structuredClone(
        ACTION_TYPES.find((item) => item.id === GENERIC_TYPE)
          ?.actionAdditionalDetailDefault
      )
    );

    setStartAt(null);
    setEndAt(null);
  }

  function updateActionType(newActionType) {
    if (!newActionType) return;

    const matched = ACTION_TYPES.find((t) => t.id === newActionType);
    if (!matched) return;

    setActionType(matched.id);
    setActionAdditionalDetails(
      structuredClone(matched.actionAdditionalDetailDefault)
    );
  }

  function handleAdditionalDetailsChange(index, field, value) {
    const updated = [...actionAdditionalDetails];
    updated[index][field] = value;
    setActionAdditionalDetails(updated);
  }

  function restoreAdditionalDetails(type, actionDetails) {
    const updated = structuredClone(
      ACTION_TYPES.find((item) => item.id === type)
        ?.actionAdditionalDetailDefault
    );

    const restored = updated.map((item, index) => {
      const keyMap = [
        actionDetails.additionalKey1,
        actionDetails.additionalKey2,
        actionDetails.additionalKey3,
      ];

      const valueMap = [
        actionDetails.additionalValue1,
        actionDetails.additionalValue2,
        actionDetails.additionalValue3,
      ];

      return {
        ...item,
        key: item.key || keyMap[index] || "",
        value: valueMap[index] ?? "",
      };
    });

    setActionAdditionalDetails(restored);
  }

  async function restoreInProgressAction() {
    const inProgressAction = await actionService.GetInProgressAction();
    console.log("Receiving Action..", inProgressAction);

    if (inProgressAction) {
      setActionId(inProgressAction.actionId);
      setActionType(inProgressAction.actionType);
      setActionDetails({
        title: inProgressAction.details.title,
        description: inProgressAction.details.description,
      });
      setStartAt(inProgressAction.startAt);
      setEndAt(inProgressAction.endAt ?? null);

      restoreAdditionalDetails(
        inProgressAction.actionType,
        inProgressAction.details
      );
    }
  }

  async function startAction(userID) {
    if (actionId) return;

    const action = await actionService.CreateAction({
      userId: userID,
      actionType,
      actionTitle: actionDetails.title,
      actionDescription: actionDetails.description,
      startAt: new Date().toISOString(),
    });
    setActionId(action.actionId);
    setStartAt(action.startAt);
  }

  async function resetOrDiscardAction() {
    if (!isStarted()) resetAction();
    if (!actionId) return;

    await actionService.DiscardAction(actionId);
    resetAction();
    setActionId(null);
  }

  async function updateActionAdditionalDetails() {
    if (!actionId) return;

    await actionService.UpdateActionDetails(actionId, {
      description: actionDetails.description,
      additionalDetailsArray: actionAdditionalDetails,
    });
  }

  async function endAction() {
    if (!actionId) return;

    const updatedAction = await actionService.EndAction(
      actionId,
      new Date().toISOString()
    );
    setEndAt(updatedAction.endAt);
  }

  async function submitAction() {
    if (!actionId) return;

    await actionService.SubmitAction(actionId, {
      description: actionDetails.description,
      actionAdditionalDetails,
    });

    refreshUserEnergy();
    resetAction();
  }

  function isStarted() {
    return startAt !== null;
  }

  function isEnded() {
    return endAt !== null;
  }

  const metadata = {
    actionType,
    updateActionType,
    actionDetails,
    setActionDetails,
    actionAdditionalDetails,
    handleAdditionalDetailsChange,
    updateActionAdditionalDetails,
  };

  const lifecycle = {
    startAction,
    endAction,
    resetOrDiscardAction,
    submitAction,
    isStarted,
    isEnded,
    resetAction,
  };

  const timing = {
    startAt,
    endAt,
  };
  return (
    <CurrentActionContext.Provider
      value={{
        metadata,
        lifecycle,
        timing,
      }}
    >
      {children}
    </CurrentActionContext.Provider>
  );
}

export function useCurrentAction() {
  return useContext(CurrentActionContext);
}
