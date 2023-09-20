import React from "react";
import { useSelector } from "react-redux";

export default function NotFound() {
  const { isLoggedIn } = useSelector((store) => store.auth);
  return (
    <div>
      <div
        className="page-not-found-main"
        style={{ backgroundImage: "url(/images/newslidebanner.jpg)" }}
      >
       
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>Page you are looking for is not found</h1>
          {!isLoggedIn && (
            <h3 style={{ color: "" }}>Please Login and Try again</h3>
          )}
        </div>
      </div>
    </div>
  );
}
