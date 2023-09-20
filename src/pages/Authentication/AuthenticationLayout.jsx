import "./styles.css";
import React from "react";
import { Link } from "react-router-dom";

export default function AuthenticationLayout({ component }) {
  return (
    <div className="auth-screen">
      <div className="auth-screen-form-container">
        <div className="auth-screen-card-container">{component}</div>
      </div>
    </div>
  );
}
