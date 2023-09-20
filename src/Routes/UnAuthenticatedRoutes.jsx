import React from "react";
import { Routes, Route } from "react-router-dom";

import AuthenticationLayout from "../pages/Authentication/AuthenticationLayout";
import Login from "../pages/Authentication/Login";

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
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
}
