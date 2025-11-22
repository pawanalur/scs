import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import InProgressActionDetails from "../views/InProgressActionDetails";
import InProgressAdditionalActionDetails from "../views/InProgressActionAdditionalDetails";
import Button from "../../Shared/components/Button";
import { useCurrentAction } from "../components/CurrentActionProvider";

function InProgressScreen() {
  const {
    actionDetails,
    setActionDetails,
    actionType,
    setActionType,
    additionalDetails,
    setAdditionalDetails,
  } = useCurrentAction();

  const isStarted = useState(false);
  const [time, setTime] = useState("00:00");

  const buttonClasses = "w-25 md:w-40 h-5 md:h-10 self-end md:self-center";
  const location = useLocation();

  useEffect(() => {
    setActionType(location.state?.actionType ?? actionType);
  });

  return (
    <div className="flex flex-col items-center h-full">
      <div className="flex-1">
        <h2 className="text-xl font-bold underline text-center">In Progress</h2>
      </div>

      <div className="flex flex-5 flex-col md:flex-row w-full justify-center items-center">
        <div className="w-full h-full flex-1 pb-2 md:pb-0 md:pr-3">
          <InProgressActionDetails
            actionDetails={actionDetails}
            setActionDetails={setActionDetails}
            actionType={actionType}
            setActionType={setActionType}
            isStarted={isStarted}
          />
        </div>

        <div className="hidden md:block w-0.5 h-[75%] bg-gray-500"></div>
        <div className="block md:hidden h-0.5 w-[75%] bg-gray-500"></div>

        <div className="w-full h-full flex-1 pt-2 md:pt-0 md:pl-3">
          <InProgressAdditionalActionDetails
            additonalActionDetails={additionalDetails}
            setAddionalActionDetails={setAdditionalDetails}
            type={actionType}
            isStarted={isStarted}
          />
        </div>
      </div>

      <div className="w-full flex items-center relative my-4">
        <div className="flex-1 border-t-2 border-gray-500"></div>

        <div className="mx-4 px-6 py-2 border-2 border-gray-500 rounded-lg bg-white/70 shadow-md text-2xl font-mono">
          {time}
        </div>

        <div className="flex-1 border-t-2 border-gray-500"></div>
      </div>
      <div className="flex flex-1 flex-row w-full items-center justify-between">
        <Button label="Start" styleVariant="green" className={buttonClasses} />
        <Button label="Reset" styleVariant="red" className={buttonClasses} />
        <Button label="End" styleVariant="green" className={buttonClasses} />
        <Button label="Submit" styleVariant="green" className={buttonClasses} />
      </div>
    </div>
  );
}

export default InProgressScreen;
