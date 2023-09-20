import "./styles.css";
import React from "react";
import { Link } from "react-router-dom";

export default function AuthenticationLayout({ component }) {
  return (
    <div className="auth-screen">
      {/* <div className="auth-screen-header">
        <Link to="/">
          <img src="/images/logo.png" alt="logo" />
        </Link>
      </div> */}
      <div className="auth-screen-form-container">
        <div className="auth-screen-card-container">{component}</div>
      </div>
    </div>
  );
}
