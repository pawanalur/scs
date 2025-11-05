import Button from "../../Shared/components/Button";
import MobileMenuButton from "./MobileMenuButton";

function TopBar({ fullName, mentalEnergy, physicalEnergy, profileIcon }) {
  // Helper function to choose color TODO CHANGE TO CORRECT FORMULA
  const getEnergyColor = (value, max = 1000) => {
    const percent = (value / max) * 100;
    if (percent > 70) return "bg-green-500";
    if (percent > 30) return "bg-yellow-400";
    return "bg-red-500";
  };

  const renderBar = (label, value, max = 1000) => (
    <div className="flex items-center gap-2 text-sm font-semibold mb-1 h-5">
      <div className="w-30 text-sm font-semibold">{label}:</div>

      <div className="w-[30vw] h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getEnergyColor(
            value,
            max
          )} rounded-full transition-all duration-300`}
          style={{ width: `${(value / max) * 100}%` }}
        ></div>
      </div>
      <div className="text-sm font-semibold w-10 text-right">{value}</div>
    </div>
  );

  const buttonClasses = "py-0 h-5 w-40 hidden md:inline-flex";

  return (
    <div className="flex items-center gap-4">
      <div className="shrink-0">
        <img
          src={profileIcon}
          alt={fullName}
          className="w-16 h-16 rounded-md border-2 border-white shadow-md"
        />
      </div>

      <div className="flex flex-col gap-2 grow">
        <h3 className="text-lg font-semibold mb-2">Name: {fullName}</h3>

        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            {renderBar("Mental Energy", mentalEnergy, 100)}
            <Button
              label="Button M1"
              className={buttonClasses}
              styleVariant="black"
            />
          </div>

          <Button
            label="View Log"
            className={buttonClasses}
            styleVariant="green"
          />
        </div>

        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            {renderBar("Physical Energy", physicalEnergy, 2000)}
            <Button
              label="Button P1"
              className={buttonClasses}
              styleVariant="black"
            />
            <Button
              label="Button P2"
              className={buttonClasses}
              styleVariant="black"
            />
          </div>

          <Button
            label="View Log"
            className={buttonClasses}
            styleVariant="green"
          />
        </div>
      </div>
      <MobileMenuButton />
    </div>
  );
}

export default TopBar;
