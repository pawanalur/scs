import Button from "../../Shared/components/Button";

function InProgressAdditionalActionDetails({
  additonalActionDetails,
  setAddionalActionDetails,
  onUpdateClick,
  type,
  isStarted,
}) {
  //TODO: Change this logic to correctly work with planned logic
  const getDisabledState = (index) => {
    if (type === "basic" && index > 0) return true;
    if (type === "intermediate" && index > 1) return true;
    return false;
  };

  const handleChange = (index, field, value) => {
    const updated = [...additonalActionDetails];
    updated[index][field] = value;
    setAddionalActionDetails(updated);
  };
  return (
    <div className="flex flex-col items-center space-y-6 p-4 h-full">
      <div className="flex justify-between items-center w-full px-2">
        <h2 className="text-xl font-semibold text-center flex-1">
          Additional Values
        </h2>

        {/* Right-aligned small "G" button */}
        <Button
          className={`ml-2 text-sm font-semibold rounded-full w-6 h-6 flex items-center justify-center  ${
            type != "advanced" ? "visible" : "invisible"
          }`}
          label="G"
          styleVariant="black"
        />
      </div>

      <div className="flex flex-col items-center space-y-3 w-full">
        {additonalActionDetails.map((item, index) => (
          <div
            key={index}
            className="flex flex-row space-x-3 justify-center w-full"
          >
            <input
              type="text"
              placeholder={`Key ${index + 1}`}
              value={item.key}
              disabled={getDisabledState(index)}
              onChange={(e) => handleChange(index, "key", e.target.value)}
              className="bg-white/80 border border-gray-300 rounded-md px-3 py-1 disabled:opacity-60"
            />
            <input
              type="text"
              placeholder={`Value ${index + 1}`}
              value={item.value}
              disabled={getDisabledState(index)}
              onChange={(e) => handleChange(index, "value", e.target.value)}
              className="bg-white/80 border border-gray-300 rounded-md px-3 py-1 focus:outline-none disabled:opacity-60"
            />
          </div>
        ))}
      </div>
      <Button disabled={!isStarted} label="UPDATE" className="mt-auto" />
    </div>
  );
}

export default InProgressAdditionalActionDetails;
