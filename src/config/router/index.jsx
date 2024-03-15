import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "../../pages/dashboard";
import Doner from "../../pages/doner";
import Login from "../../pages/login";
import Signup from "../../pages/signup";
import ProtectedRoute from "../../pages/protectedRoutes";

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/doner",
        element: <Doner />,
      },
    ],
  },

  {
    path: "/signup",
    element: <Signup />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
