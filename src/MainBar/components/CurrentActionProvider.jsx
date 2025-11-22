import { createContext, useContext, useState } from "react";

import { GENERIC_TYPE } from "../../Shared/components/ActionTypeConstants";

const CurrentActionContext = createContext();

export function CurrentActionProvider({ children }) {
  const [actionType, setActionType] = useState(GENERIC_TYPE);

  const [actionDetails, setActionDetails] = useState({
    title: "",
    description: "",
  });

  const [additionalDetails, setAdditionalDetails] = useState([
    { key: "", value: "" },
    { key: "", value: "" },
    { key: "", value: "" },
  ]);

  return (
    <CurrentActionContext.Provider
      value={{
        actionType,
        setActionType,
        actionDetails,
        setActionDetails,
        additionalDetails,
        setAdditionalDetails,
      }}
    >
      {children}
    </CurrentActionContext.Provider>
  );
}

export function useCurrentAction() {
  return useContext(CurrentActionContext);
}
