import { useState } from "react";
import Button from "../../Shared/components/Button";
import { useCurrentAction } from "../components/CurrentActionProvider";
import {
  EAT_TYPE,
  EAT_CALORIE_KEY,
  EAT_SUGAR_KEY,
  EAT_PROTEIN_KEY,
} from "../../Shared/components/ActionTypeConstants";
import GenerateEatAdditionalDetailsModal from "../components/GenerateEatAdditionalDetailsModal";

function InProgressAdditionalActionDetails() {
  const {
    actionType,
    actionAdditionalDetails,
    setActionAdditionalDetails,
    updateActionAdditionalDetails,
  } = useCurrentAction().metadata;
  const { isStarted } = useCurrentAction().lifecycle;

  const [showGenerateModal, setShowGenerateModal] = useState(false);

  function handleEatAdditionalDetailsGenerated(
    calorieValue,
    sugarValue,
    proteinValue
  ) {
    if (actionType == EAT_TYPE) {
      handleChange(EAT_CALORIE_KEY, "value", calorieValue);
      handleChange(EAT_SUGAR_KEY, "value", sugarValue);
      handleChange(EAT_PROTEIN_KEY, "value", proteinValue);
    }
  }
  const handleChange = (index, field, value) => {
    const updated = [...actionAdditionalDetails];
    updated[index][field] = value;
    setActionAdditionalDetails(updated);
  };
  return (
    <div className="flex flex-col items-center space-y-6 p-4 h-full">
      <GenerateEatAdditionalDetailsModal
        isModalOpen={showGenerateModal}
        setIsModalOpen={setShowGenerateModal}
        onGenerate={handleEatAdditionalDetailsGenerated}
      />
      <div className="flex justify-between items-center w-full px-2">
        <h2 className="text-xl font-semibold text-center flex-1">
          Additional Values
        </h2>

        {/* Right-aligned small "G" button */}
        <Button
          className={`ml-2 text-sm font-semibold rounded-full w-6 h-6 flex items-center justify-center  ${
            actionType === EAT_TYPE ? "visible" : "invisible"
          }`}
          label="G"
          styleVariant="black"
          onClick={() => {
            setShowGenerateModal(true);
          }}
        />
      </div>
      <div className="flex flex-col items-center space-y-3 w-full">
        {actionAdditionalDetails?.map((item, index) => (
          <div
            key={index}
            className="flex flex-row space-x-3 justify-center w-full"
          >
            <input
              type="text"
              placeholder={`Key ${index + 1}`}
              value={item.key}
              disabled={item.keyDisabled}
              onChange={(e) => handleChange(index, "key", e.target.value)}
              className={`bg-white/80 border-2 rounded-md px-3 py-1 disabled:opacity-60 ${
                item.keyDisabled ? "border-gray-300" : "border-blue-500"
              }`}
            />

            <input
              type="text"
              placeholder={`Value ${index + 1}`}
              value={item.value}
              disabled={item.valuedisabled}
              onChange={(e) => handleChange(index, "value", e.target.value)}
              className={`bg-white/80 border-2 rounded-md px-3 py-1 disabled:opacity-60 ${
                item.valuedisabled ? "border-gray-300" : "border-blue-500"
              }`}
            />
          </div>
        ))}
      </div>

      <Button
        disabled={!isStarted()}
        label="UPDATE"
        className="mt-auto"
        onClick={updateActionAdditionalDetails}
      />
    </div>
  );
}

export default InProgressAdditionalActionDetails;
