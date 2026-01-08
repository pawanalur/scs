import { useEffect, useState } from "react";
import { useCurrentAction } from "../../Shared/providers/CurrentActionProvider";
import GenericLogPage from "../../Shared/views/GenericLogPage";

function AllActionsLogScreen() {
  const [entries, setEntries] = useState([]);
  const { getActionsByEnergyType } = useCurrentAction().metadata;

  useEffect(() => {
    async function loadActions() {
      const result = await getActionsByEnergyType(null);
      setEntries(result);
    }

    loadActions();
  }, [getActionsByEnergyType]);
  return <GenericLogPage pageTitle="All Actions" entries={entries} />;
}

export default AllActionsLogScreen;
