import { useEffect, useState } from "react";
import { useCurrentAction } from "../../Shared/providers/CurrentActionProvider";
import { MENTAL_LABEL } from "../../Shared/components/constants/EnergyDetailConstants";
import GenericLogPage from "../../Shared/views/GenericLogPage";
function MentalLogScreen() {
  const [entries, setEntries] = useState([]);
  const { getActionsByEnergyType } = useCurrentAction().metadata;

  useEffect(() => {
    async function loadMentalActions() {
      const result = await getActionsByEnergyType(MENTAL_LABEL);
      setEntries(result);
    }

    loadMentalActions();
  }, [getActionsByEnergyType]);
  return <GenericLogPage pageTitle="Mental Energy Log" entries={entries} />;
}

export default MentalLogScreen;
