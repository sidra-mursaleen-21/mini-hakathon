import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const [login, setLogIn] = useState(JSON.parse(localStorage.getItem("login")));
  const Navigate = useNavigate();

  useEffect(() => {
    login ? Navigate("/dashboard") : Navigate("/");
  }, []);

  return <Outlet />;
};

export default ProtectedRoute;
