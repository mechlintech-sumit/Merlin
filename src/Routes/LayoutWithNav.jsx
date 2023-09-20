import React from "react";
import NavigationBar from "../components/NavigationBar";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";

export default function LayoutWithNav({ path, component }) {
  const { toggle } = useSelector((store) => store.auth);
  return (
    <div className="layout">
      <div className="layout-navigation" style={{ width: toggle && 80 }}>
        <NavigationBar />
      </div>
      <div className="layout-component">{component}</div>
    </div>
  );
}
