import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginScreen from "./pages/auth/LoginScreen.jsx";
import SignUpScreen from "./pages/auth/SignUpScreen.jsx";
import HomeScreen from "./pages/HomeScreen.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element:  <ProtectedRoute>
    <HomeScreen />
  </ProtectedRoute>,
  },
  {
    path: "/login",
    element: <LoginScreen />,
  },
  {
    path: "/signup",
    element: <SignUpScreen />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
