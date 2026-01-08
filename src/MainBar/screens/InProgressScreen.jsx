import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import InProgressActionDetails from "../views/InProgressActionDetails";
import InProgressAdditionalActionDetails from "../views/InProgressActionAdditionalDetails";
import ActionTimer from "../components/ActionTimer";
import ConfirmDiscardModal from "../components/ConfirmDiscardModal";
import Button from "../../Shared/components/Button";
import { useCurrentAction } from "../../Shared/providers/CurrentActionProvider";

function InProgressScreen() {
  const { lifecycle, metadata, timing } = useCurrentAction();
  const { updateActionType } = metadata;

  const buttonClasses = "w-25 md:w-40 h-5 md:h-10 self-end md:self-center";
  const location = useLocation();
  const timerRef = useRef();
  const [showConfirmDiscard, setShowConfirmDiscard] = useState(false);

  useEffect(() => {
    updateActionType(location.state?.actionType);
  }, [location.state?.actionType]);

  useEffect(() => {
    if (!timing.startAt) return;

    let endDuration = Date.now();
    if (lifecycle.isEnded()) endDuration = new Date(timing.endAt);

    const elapsedSeconds = Math.floor(
      (endDuration - new Date(timing.startAt).getTime()) / 1000
    );

    timerRef.current.setElapsedSecondsExternally(elapsedSeconds);
    if (!lifecycle.isEnded()) {
      timerRef.current.startTimer();
    }
  }, [timing.startAt]);

  function OnResetClick() {
    lifecycle.resetOrDiscardAction();
    timerRef.current.resetTimer();
  }

  function OnStartClick() {
    lifecycle.startAction();
    timerRef.current.startTimer();
  }

  function OnEndClick() {
    lifecycle.endAction();
    timerRef.current.endTimer();
  }

  function OnSubmitClick() {
    lifecycle.submitAction();
    timerRef.current.resetTimer();
  }

  return (
    <div className="flex flex-col items-center h-full">
      <ConfirmDiscardModal
        isModalOpen={showConfirmDiscard}
        setIsModalOpen={setShowConfirmDiscard}
        onConfirm={OnResetClick}
      />
      <div className="flex-1">
        <h2 className="text-xl font-bold underline text-center">In Progress</h2>
      </div>

      <div className="flex flex-5 flex-col md:flex-row w-full justify-center items-center">
        <div className="w-full h-full flex-1 pb-2 md:pb-0 md:pr-3">
          <InProgressActionDetails />
        </div>

        <div className="hidden md:block w-0.5 h-[75%] bg-gray-500"></div>
        <div className="block md:hidden h-0.5 w-[75%] bg-gray-500"></div>

        <div className="w-full h-full flex-1 pt-2 md:pt-0 md:pl-3">
          <InProgressAdditionalActionDetails />
        </div>
      </div>

      <div className="w-full flex items-center relative my-4">
        <div className="flex-1 border-t-2 border-gray-500"></div>

        <div className="mx-4 px-6 py-2 border-2 border-gray-500 rounded-lg bg-white/70 shadow-md text-2xl font-mono">
          <ActionTimer ref={timerRef} />
        </div>

        <div className="flex-1 border-t-2 border-gray-500"></div>
      </div>
      <div className="flex flex-1 flex-row w-full items-center justify-between">
        <Button
          label="Start"
          styleVariant="green"
          className={buttonClasses}
          onClick={OnStartClick}
          disabled={lifecycle.isEnded()}
        />
        <Button
          label={`${lifecycle.isStarted() ? "Discard" : "Reset"}`}
          styleVariant="red"
          className={buttonClasses}
          onClick={() =>
            lifecycle.isStarted() ? setShowConfirmDiscard(true) : OnResetClick()
          }
        />
        <Button
          label="End"
          styleVariant="green"
          className={buttonClasses}
          onClick={OnEndClick}
          disabled={!lifecycle.isStarted()}
        />
        <Button
          label="Submit"
          styleVariant="green"
          className={buttonClasses}
          onClick={OnSubmitClick}
          disabled={!lifecycle.isEnded()}
        />
      </div>
    </div>
  );
}

export default InProgressScreen;
