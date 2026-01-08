## Overview

Self-Control Shop is a frontend-first React application used to prototype and validate
UI, state management, and gameplay mechanics before backend integration. The project intentionally uses mock services and local JSON data to allow rapid
iteration on the UI and application logic without depending on a live API.

[![Deployed on Vercel](https://vercel.com/button)](https://scs-sigma.vercel.app/)

Tech Stack:

- React
- Vite
- JavaScript (ES6+)
- React Context for global state
- Mock services (no backend)

## Prerequisites

- Node.js (v18+ recommended)
- npm (v9+)

## Getting Started

1. Clone the repository

   ```bash
   git clone <repo-url>
   cd self-control-shop

   ```

2. Install Dependencies
   npm install

3. Start the development server
   npm run dev

4. By default, the app runs at
   http://localhost:5173

## Authentication & Mock Data

This project does not use a real backend.
Instead, authentication and user data are simulated using mock services and local JSON
files.

How login works

- The login flow calls a mock login service
- The service reads data from local JSON files
- On successful login, the following are initialized:
- User identity
- Physical & mental energy values
- Energy alert thresholds (warnings & errors)
- There is no password validation or real authentication logic.

## Session & State Model

Session lifecycle

- Login initializes a new user session
- Logout clears all session data
- Refreshing the page resets the session
- Energy Alerts
- Energy alert thresholds are loaded once at login
- They are treated as read-only session configuration
- Alerts do not change during an active session
- Alerts are cleared on logout
- This mirrors how configuration data would typically be handled in a real backend-driven
  application.

## UI State

UI-specific state such as:

- Active actions
- Timers
- Modals

In-progress tasks are managed using React Context and local component state.

## Current Limitations

1. No persistent backend
2. No real authentication or authorization
3. Data resets on page refresh
4. Mock data is shared across sessions
5. These limitations are intentional for frontend prototyping.

## Future Improvements

1. Replace mock services with real API integration
2. Persist user sessions
3. Improved authentication flow

## Notes for Reviewers

This project is designed to demonstrate:

- Clean React state management
- Intentional session modeling
- Separation of UI logic from data sources
- Scalable frontend architecture suitable for backend integration
