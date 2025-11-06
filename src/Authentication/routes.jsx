import { lazy } from "react";

const Login = lazy(() => import("./views/Login"));
const Signup = lazy(() => import("./views/Signup"));

export const authRoutes = {
  path: "/",
  children: [
    { index: true, element: <Login /> }, // "/"
    { path: "login", element: <Login /> }, // "/login"
    { path: "signup", element: <Signup /> }, // "/signup"
  ],
};
