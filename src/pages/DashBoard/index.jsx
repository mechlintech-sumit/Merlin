import React, { useState, useEffect } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { getTimeZone } from "../../redux/Actions/authAction";

import { localStorage_userData } from "../../constants";

export default function DashBoard() {
  const dispatch = useDispatch();
  const { timeZones, userInfo } = useSelector((store) => store.auth);
  const [TimeZone, setTimeZone] = useState(userInfo?.timezone);

  useEffect(() => {
    dispatch(getTimeZone());
  }, [dispatch]);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem(localStorage_userData));
    if (data !== null) {
      let newData = { ...data, timezone: TimeZone };
      localStorage.setItem(localStorage_userData, JSON.stringify(newData));
      if (userInfo?.timezone !== TimeZone) {
        window.location.reload();
      }
    }
  }, [TimeZone, userInfo?.timezone]);

  return (
    <div className="page-container">
      <div className="dashboard-header">
        <h1>Merlin Equity</h1>
        {/* <div className="selectdiv">
          <select
            value={TimeZone}
            onChange={(e) => setTimeZone(e.target.value)}
          >
            <option selected>Select TimeZone</option>
            {timeZones.map((timezone) => (
              <option value={timezone}>{timezone}</option>
            ))}
          </select>
        </div> */}
      </div>
     
    </div>
  );
}
