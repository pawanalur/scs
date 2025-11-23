export const ACTION_TYPES = [
  {
    id: "generic",
    label: "Generic Action",
    actionAdditionalDetailDefault: [
      { key: "", value: "", keyDisabled: false, valuedisabled: false },
      { key: "", value: "", keyDisabled: false, valuedisabled: false },
      { key: "", value: "", keyDisabled: false, valuedisabled: false },
    ],
  },
  {
    id: "sleep",
    label: "Sleep",
    actionAdditionalDetailDefault: [
      { key: "", value: "", keyDisabled: true, valuedisabled: true },
      { key: "", value: "", keyDisabled: true, valuedisabled: true },
      { key: "", value: "", keyDisabled: true, valuedisabled: true },
    ],
  },
  {
    id: "eat",
    label: "Eat",
    actionAdditionalDetailDefault: [
      { key: "Calories", value: "", keyDisabled: true, valuedisabled: false },
      { key: "Sugar(g)", value: "", keyDisabled: true, valuedisabled: false },
      { key: "Protein(g)", value: "", keyDisabled: true, valuedisabled: false },
    ],
  },
  {
    id: "exercise",
    label: "Exercise",
    actionAdditionalDetailDefault: [
      { key: "Calories", value: "", keyDisabled: true, valuedisabled: false },
      { key: "Type", value: "", keyDisabled: true, valuedisabled: false },
      { key: "", value: "", keyDisabled: true, valuedisabled: true },
    ],
  },
];

export const GENERIC_TYPE = "generic";
export const SLEEP_TYPE = "sleep";
export const EAT_TYPE = "eat";
export const EXERCISE_TYPE = "exercise";
