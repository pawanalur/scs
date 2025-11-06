import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import Login from "./Authentication/views/Login";
import Signup from "./Authentication/views/Signup";
import UserHome from "./UserHome";
import InProgressScreen from "./MainBar/views/InProgressScreen";
import QuestScreen from "./MainBar/views/QuestScreen";
import PhysicalLog from "./MainBar/views/PhysicalLog";
import MentalLog from "./MainBar/views/MentalLog";
import ShopScreen from "./MainBar/views/ShopScreen";

function App() {
  const [count, setCount] = useState(0);
  const DUMMY = {
    id: "dummy",
    fullName: "Dummy User",
    mentalEnergy: 100,
    physicalEnergy: 1000,
    profileIcon: viteLogo,
    inProgressTask: 10,
    inProgressTaskType: "Sleep",
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <a href="https://vite.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
              </a>
              <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
              <h1 className="text-2xl font-bold underline">Vite + React</h1>
              <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                  count is {count}
                </button>
                <p>
                  Edit <code>src/App.jsx</code> and save to test HMR
                </p>
              </div>
              <p className="read-the-docs">
                Click on the Vite and React logos to learn more
              </p>
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<UserHome currentUser={DUMMY} />}>
          <Route index element={<InProgressScreen />} />
          <Route path="quests" element={<QuestScreen />} />
          <Route path="physical-log" element={<PhysicalLog />} />
          <Route path="mental-log" element={<MentalLog />} />
          <Route path="shop" element={<ShopScreen />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
