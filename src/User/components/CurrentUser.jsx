function CurrentUser({ fullName, mentalEnergy, physicalEnergy, profileIcon }) {
  // Helper function to choose color TO CHANGE TO CORRECT FORMULA
  const getEnergyColor = (value, max = 1000) => {
    const percent = (value / max) * 100;
    if (percent > 70) return "bg-green-500";
    if (percent > 30) return "bg-yellow-400";
    return "bg-red-500";
  };

  const renderBar = (label, value, max = 1000) => (
    <div className="mb-2">
      <div className="flex items-center gap-2 text-sm font-semibold mb-1">
        <div className="w-30 text-sm font-semibold">{label}:</div>

        <div className="w-[30%] h-4 bg-gray-200 rounded-full overflow-hidden">
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
    </div>
  );

  return (
    <div className="flex items-center gap-6">
      {/* User Image */}
      <div className="flex-shrink-0">
        <img
          src={profileIcon}
          alt={fullName}
          className="w-16 h-16 rounded-md border-2 border-white shadow-md"
        />
      </div>

      {/* User Info */}
      <div className="flex flex-col w-full">
        <h3 className="text-lg font-semibold mb-2">Name: {fullName}</h3>
        {renderBar("Mental Energy", mentalEnergy, 100)}
        {renderBar("Physical Energy", physicalEnergy, 2000)}
      </div>
    </div>
  );
}

export default CurrentUser;
