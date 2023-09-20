import React, { useEffect } from "react";
import LayoutWithNav from "./LayoutWithNav";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";




// pages components
// import DashBoard from "../pages/DashBoard";


import NotFound from "../pages/404";

export default function AuthenticatedRoutes() {
  const dispatch = useDispatch();

  return (
    <Routes>
      {/* <Route path="/" element={<LayoutWithNav component={<DashBoard />} />} /> */}
      <Route
        path="/WorkDiary"
        element={<LayoutWithNav component={"WorkDiary"} />}
      >
      
      </Route>

      <Route
        path="/ResourceManagement"
        element={<LayoutWithNav component={"Hii Resource"} />}
      >
      
      </Route>
      {/* <Route
        path="/Reports"
        element={<LayoutWithNav component={<Reports />} />}
      /> */}
      <Route
        path="/Reports"
        element={<LayoutWithNav component={"Report"} />}
      >
      
      </Route>

      <Route
        path="/Feedback"
        element={<LayoutWithNav component={"Feedback"} />}
      />
      <Route
        path="/DownloadApplication"
        element={<LayoutWithNav component={"DownloadApplication"} />}
      />
      <Route
        path="/ProfileSettings"
        element={<LayoutWithNav component={"Profile"} />}
      />

     
      <Route
        path="/Subscription"
        element={<LayoutWithNav component={"Subscription"} />}
      >
        <Route index element={'PLAN'}></Route>
      </Route>
      <Route
        path="/ActivePlan"
        element={<LayoutWithNav component={'ActivePlan'} />}
      />

      <Route path="*" element={<LayoutWithNav component={<NotFound />} />} />
    </Routes>
  );
}
