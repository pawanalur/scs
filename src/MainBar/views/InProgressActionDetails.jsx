import MDEditor from "@uiw/react-md-editor";
import { ACTION_TYPES } from "../../Shared/components/ActionTypeConstants";

function InProgressActionDetails({
  actionDetails,
  setActionDetails,
  actionType,
  setActionType,
  isStarted,
}) {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold text-center">Action Details</h2>
      <div className="flex flex-col space-y-3">
        <label className="font-medium">
          Title:
          <input
            type="text"
            className="border border-gray-400 rounded w-full p-1 mt-1 bg-white shadow-sm"
            value={actionDetails.title}
            onChange={(val) =>
              setActionDetails((prev) => ({
                ...prev,
                title: val.target.value || "",
              }))
            }
            placeholder="Enter title"
          />
        </label>

        <label className="font-medium">
          Description:
          <MDEditor
            className="w-full"
            value={actionDetails.description}
            onChange={(val) =>
              setActionDetails((prev) => ({ ...prev, description: val || "" }))
            }
          />
        </label>

        <label className="font-medium">
          Type:
          <select
            className="border border-gray-400 rounded w-full p-1 mt-1  bg-white shadow-sm"
            value={actionType}
            onChange={(e) => {
              setActionType(e.target.value);
            }}
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
