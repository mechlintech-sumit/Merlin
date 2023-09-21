import React from "react";

export default function SearchInput(props) {
  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        placeholder="Search Here ..."
        {...props}
      />
    </div>
  );
}
