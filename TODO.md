## NEXT STEPS

- The next step is to build the generic action layout in the "In Progress" screen.

  - Separate the timer into it's own component, and have "Start" and "" work on the timer: DONE. Created a timer component, and Start and End display hardcoded values.
  - Add the disabled logic for "End" and "Submit": Done. "End" and "Submit" now have correct disabled set.
  - Organize CurrentActionProvider groupings: DONE.
  - Update ResetAction to also reset Start and End times: DONE
  - Update "Additional Values" to have specific Keys/Disabled status for specific Type: DONE
  - Have the "Reset" button display "Discard" on isStarted: DONE
  - Add the hidden logic for button "G": DONE
  - Create sample JSON's for "Actions, Sleep, Eat, and Exercise" based on planned DB: DONE, Added to .gitignore as temporary.

  - Update Timer to start from "Current Time - Action Start At" instead of 00:00:00, and add logic to actually work as a timer: DONE.
  - Create a generic modal component: DONE.
  - Have the submit button work to save into these temporary JSON's, depending on ActionType. Add validators and warning labels: PARTIALLY DONE.
  - Have the "Update" button work to save into these temporary JSON's. Add validators and warning labels. Move all inputs into it's own component: PARTIALLY DONE
    - NEXT STEPS: First, get all of Create, Update, Discard, Submit to work properly with the service layer - DONE.
    - Then, refactor the form/input to have validation looking at the videos.
  - Create a popup for the G button, and add a food description, and an optional image to generate Calories, Sugar, Protein: DONE.
  - Create userProvider and UserService. Temporarily hardcode login user via JSON + Hardcoded UserID.
  - Verify currentAction is fetched when page loads.
  - Create per min energy update functions.

- Update color logic for bars.
- Create the "Phyical Energy Log"
- Create the "Mental Energy Log"
- Create the Login and Signup pages.
