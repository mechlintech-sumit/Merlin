import React from "react";
import { Routes, Route } from "react-router-dom";

import AuthenticationLayout from "../pages/Authentication/AuthenticationLayout";
import Login from "../pages/Authentication/Login";
import ForgotPassword from "../pages/Authentication/ForgotPassword";
import ResetPassword from "../pages/Authentication/ResetPassword";

export default function UnAuthenticatedRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<AuthenticationLayout component={<Login />} />}
        />
        <Route
          path="/Login"
          element={<AuthenticationLayout component={<Login />} />}
        />
        <Route
          path="/ForgotPassword"
          element={<AuthenticationLayout component={<ForgotPassword />} />}
        />
        <Route
          path="/ResetPassword/:token"
          element={<AuthenticationLayout component={<ResetPassword />} />}
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
}
