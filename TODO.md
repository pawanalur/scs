# NEXT STEPS

## Version: Demo

This version is not complete and deployed!

### These are completed tasks for this version:

- All energy calculations should work properly:
  - Every sleep, mental energy should rise - Whenever I submit a sleep action, I should update mental energy (connect the 2 providers, and have a userService updateEnergy function)
  - Every Eat/Exercise, physical energy should change - Whenever I submit these actions, I should update physical energy.
  - Correct Energy Log colors - Update the JSON with correct values. Update the TopBar function to use these
  - Every minute, my energy levels should fall - Add "UpdateEnergy" to userService that calculates energy based on timestamp. Add a timer to userProvider that calls this every minute.
- Create Logout, ensure proper NULL values set. Allow action to persist after logout - The system should check that currentAction is fetched after logout.
- Display only “Action”, and “Energy Change” in the logs - Create a very simplistic UI for "Physical and Mental energy logs.
- Create and Display "Action Log" - Create a simple "Action Log" button that displays just a list of names with start and end timestamps.
- Deploy demo to the cloud.

## Version: Fullstack Demo

I will build the backend for this application. The following features will be implemented:

- Create proper User Login and Signup pages.
- Instead of hardcoding, call Claude/OpenAI API for Calorie/Protein/Sugar value calculation.
- Integrate the whole project with the backend.
- Establish a basic CI/CD pipeline.

## Version: 1.0

This will be the first version to be considered properly "Complete".

- Change the logs to have all details
- Add validation for all fields:
  - Refactor the form/input to have validation
    - Create a separate input component for validation/specific UI (Videos 60-62).
    - Create a form validation, and add this check to “Submit” (Videos 63-64)
    - Create a custom useForm hook.
    - Loading Screen when we wait for HTTP requests.
  - Use <form> for login and submit. Same page, with a mode switch (Video 70/71)
- Add unit testing, and ensure 100% Unit Test coverage.
