import { useState } from "react";

import InProgressActionDetails from "../views/InProgressActionDetails";
import InProgressAdditionalActionDetails from "../views/InProgressActionAdditionalDetails";
import Button from "../../Shared/components/Button";

function InProgressScreen() {
  const [actionDetails, setActionDetails] = useState({
    title: "",
    description: "",
  });

  const [actionType, setActionType] = useState("Generic");

  const [additionalDetails, setAdditionalDetails] = useState([
    { key: "", value: "" },
    { key: "", value: "" },
    { key: "", value: "" },
  ]);

  const isStarted = useState(false);

  const buttonClasses = "w-25 md:w-40 h-5 md:h-10 self-end md:self-center";

  return (
    <div className="flex flex-col gap-6 items-center h-full">
      <div className="flex-1">
        <h2 className="text-xl font-bold underline text-center">In Progress</h2>
      </div>

      <div className="flex flex-5 flex-col md:flex-row gap-6 w-full justify-center items-center">
        <div className="w-full h-full flex-1">
          <InProgressActionDetails
            actionDetails={actionDetails}
            setActionDetails={setActionDetails}
            actionType={actionType}
            setActionType={setActionDetails}
            isStarted={isStarted}
          />
        </div>

        <div className="hidden md:block w-0.5 h-[75%] bg-gray-500"></div>
        <div className="block md:hidden h-0.5 w-[75%] bg-gray-500"></div>

        <div className="w-full h-full flex-1">
          <InProgressAdditionalActionDetails
            additonalActionDetails={additionalDetails}
            setAddionalActionDetails={setAdditionalDetails}
            type={actionType}
            isStarted={isStarted}
          />
        </div>
      </div>

      <div className="h-0.5 w-full bg-gray-500"></div>

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
