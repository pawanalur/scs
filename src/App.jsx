import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Login from "./User/pages/Login";
import Signup from "./User/pages/Signup";
import UserHome from "./User/pages/UserHome";

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
      <Switch>
        <Route path="/" exact>
          <div>
            <a href="https://vite.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
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
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/home">
          <UserHome currentUser={DUMMY} />
        </Route>
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
}

export default App;
