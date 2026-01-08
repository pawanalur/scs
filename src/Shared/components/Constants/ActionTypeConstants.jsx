export const ACTION_TYPES = [
  {
    id: "generic",
    label: "Generic Action",
    actionAdditionalDetailDefault: [
      { key: "", value: "", keyDisabled: false, valueDisabled: false },
      { key: "", value: "", keyDisabled: false, valueDisabled: false },
      { key: "", value: "", keyDisabled: false, valueDisabled: false },
    ],
  },
  {
    id: "sleep",
    label: "Sleep",
    actionAdditionalDetailDefault: [
      { key: "", value: "", keyDisabled: true, valueDisabled: true },
      { key: "", value: "", keyDisabled: true, valueDisabled: true },
      { key: "", value: "", keyDisabled: true, valueDisabled: true },
    ],
  },
  {
    id: "eat",
    label: "Eat",
    actionAdditionalDetailDefault: [
      { key: "Calories", value: "", keyDisabled: true, valueDisabled: false },
      { key: "Sugar(g)", value: "", keyDisabled: true, valueDisabled: false },
      { key: "Protein(g)", value: "", keyDisabled: true, valueDisabled: false },
    ],
  },
  {
    id: "exercise",
    label: "Exercise",
    actionAdditionalDetailDefault: [
      { key: "Calories", value: "", keyDisabled: true, valueDisabled: false },
      { key: "Type", value: "", keyDisabled: true, valueDisabled: false },
      { key: "", value: "", keyDisabled: true, valueDisabled: true },
    ],
  },
];

export const GENERIC_TYPE = "generic";
export const SLEEP_TYPE = "sleep";
export const EAT_TYPE = "eat";
export const EXERCISE_TYPE = "exercise";

export const EAT_CALORIE_KEY = 0;
export const EAT_SUGAR_KEY = 1;
export const EAT_PROTEIN_KEY = 2;

export const KEY_LABEL = "key";
export const VALUE_LABEL = "value";
