import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { localStorage_userData } from "../constants";
import AuthenticatedRoutes from "./AuthenticatedRoutes";
import UnAuthenticatedRoutes from "./UnAuthenticatedRoutes";

export default function AppRoutes() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((store) => store.auth);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem(localStorage_userData));
    if (userData) {
      dispatch({ type: "LOG_IN", payload: userData });
    }
  }, [dispatch]);

  return (
    <div>
      {isLoggedIn ? <AuthenticatedRoutes /> : <UnAuthenticatedRoutes />}
    </div>
  );
}
