import { Suspense } from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

import AppRoutes from "./AppRoutes.jsx";

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="h-screen">Loading...</div>}>
        <AppRoutes />
      </Suspense>
    </Router>
  );
}

export default App;
