import MDEditor from "@uiw/react-md-editor";
import { ACTION_TYPES } from "../../Shared/components/Constants/ActionTypeConstants";
import { useCurrentAction } from "../../Shared/providers/CurrentActionProvider";

function InProgressActionDetails() {
  const { actionDetails, setActionDetails, actionType, updateActionType } =
    useCurrentAction().metadata;
  const { isStarted } = useCurrentAction().lifecycle;
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold text-center">Action Details</h2>
      <div className="flex flex-col space-y-3">
        <label className="font-medium">
          Title:
          <input
            type="text"
            className={`border-2 rounded w-full p-1 mt-1 bg-white shadow-sm disabled:opacity-60 ${
              isStarted() ? "border-gray-300" : "border-blue-500"
            }`}
            value={actionDetails.title}
            onChange={(val) =>
              setActionDetails((prev) => ({
                ...prev,
                title: val.target.value || "",
              }))
            }
            placeholder="Enter title"
            disabled={isStarted()}
          />
        </label>

        <label className="font-medium">
          Description:
          <div className="border-2 border-blue-500 rounded w-full p-1 mt-1  bg-white shadow-sm">
            <MDEditor
              className="w-full"
              value={actionDetails.description}
              onChange={(val) =>
                setActionDetails((prev) => ({
                  ...prev,
                  description: val || "",
                }))
              }
            />
          </div>
        </label>

        <label className="font-medium">
          Type:
          <select
            className={`border-2 rounded w-full p-1 mt-1 bg-white shadow-sm disabled:opacity-60 ${
              isStarted() ? "border-gray-300" : "border-blue-500"
            }`}
            value={actionType}
            onChange={(e) => {
              updateActionType(e.target.value);
            }}
            disabled={isStarted()}
          >
            {ACTION_TYPES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}

export default InProgressActionDetails;
