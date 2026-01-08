import { useEffect, useState } from "react";
import { useCurrentAction } from "../../Shared/providers/CurrentActionProvider";
import { PHYSICAL_LABEL } from "../../Shared/components/Constants/EnergyDetailConstants";
import GenericLogPage from "../../Shared/views/GenericLogPage";

function PhysicalLog() {
  const [entries, setEntries] = useState([]);
  const { getActionsByEnergyType } = useCurrentAction().metadata;

  useEffect(() => {
    async function loadPhysicalActions() {
      const result = await getActionsByEnergyType(PHYSICAL_LABEL);
      setEntries(result);
    }

    loadPhysicalActions();
  }, [getActionsByEnergyType]);
  return <GenericLogPage pageTitle="Physical Energy Log" entries={entries} />;
}

export default PhysicalLog;
