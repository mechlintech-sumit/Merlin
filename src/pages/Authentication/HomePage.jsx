import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getContactList } from "../../redux/Actions/authAction";
import "./styles.css";

export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContactList());
  }, []);

  return (
    <div className="container">
      <button type="button" class="btn btn-primary custom-button">
        Primary
      </button>
      <button type="button" class="btn btn-primary custom-button">
        Primary
      </button>
    </div>
  );
}
