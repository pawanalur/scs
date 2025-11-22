import { createContext, useContext, useState } from "react";

import { GENERIC_TYPE } from "../../Shared/components/ActionTypeConstants";

const CurrentActionContext = createContext();

export function CurrentActionProvider({ children }) {
  const [actionType, setActionType] = useState(GENERIC_TYPE);
  const [startAt, setStartAt] = useState(null);
  const [endAt, setEndAt] = useState(null);

  const [actionDetails, setActionDetails] = useState({
    title: "",
    description: "",
  });

  const [actionAdditionalDetails, setActionAdditionalDetails] = useState([
    { key: "", value: "" },
    { key: "", value: "" },
    { key: "", value: "" },
  ]);

  function resetAction() {
    setActionDetails({
      title: "",
      description: "",
    });

    setActionType(GENERIC_TYPE);

    setActionAdditionalDetails([
      { key: "", value: "" },
      { key: "", value: "" },
      { key: "", value: "" },
    ]);
  }

  function startAction() {
    setStartAt(new Date().toISOString());
  }

  function endAction() {
    setEndAt(new Date().toISOString());
  }

  function updateActionType(newActionType) {
    setActionType(newActionType ?? actionType);
  }

  function isStarted() {
    return startAt !== null;
  }

  function isEnded() {
    return endAt !== null;
  }

  function updateActionAdditionalDetails() {
    console.log("Update Clicked");
  }

  const metadata = {
    actionType,
    updateActionType,
    actionDetails,
    setActionDetails,
    actionAdditionalDetails,
    setActionAdditionalDetails,
    updateActionAdditionalDetails,
  };

  const lifecycle = {
    startAction,
    endAction,
    resetAction,
    isStarted,
    isEnded,
  };

  const timing = {
    startAt,
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
