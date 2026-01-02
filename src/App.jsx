import { Suspense } from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { CurrentUserProvider } from "./Shared/components/CurrentUserProvider.jsx";

import AppRoutes from "./AppRoutes.jsx";

function App() {
  return (
    <CurrentUserProvider>
      <Router>
        <Suspense fallback={<div className="h-screen">Loading...</div>}>
          <AppRoutes />
        </Suspense>
      </Router>
    </CurrentUserProvider>
  );
}

export default App;
