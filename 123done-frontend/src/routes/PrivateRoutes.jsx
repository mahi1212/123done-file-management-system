import { useAtom } from "jotai";
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { userAtom } from "../lib/jotai";

const PrivateRoute = ({ children }) => {
  const user = useAtom(userAtom);
  // console.log(user, 'user')
  const location = useLocation();

  if (user[0]?.role == 'user' || user[0]?.role == 'admin') {
    return children;
  }

  return <Navigate to="/signin" state={{ from: location }} replace />;
};

export default PrivateRoute;