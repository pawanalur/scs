import { useRoutes, Navigate } from "react-router-dom";

import { userRoutes } from "./routes";
import { authRoutes } from "./Authentication/routes.jsx";

function AppRoutes() {
  const routes = [
    authRoutes,
    userRoutes,
    { path: "*", element: <Navigate to="/login" replace /> },
  ];

  return useRoutes(routes);
}

export default AppRoutes;
