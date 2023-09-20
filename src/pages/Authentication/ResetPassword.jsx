import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../redux/Actions/authAction";
import { useDispatch } from "react-redux";
import { localstorage_userInfo, localStorage_userData } from "../../constants";
import { passwordValidator } from "../../Utils/fieldValidator";

export default function ResetPassword() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    password: "",
    conformPassword: "",
    showPassword: false,
    newshowPassword: false,
  });
  const { token } = useParams();
  const [errors, setErrors] = useState(false);
  const [ispasswordValid, setisPasswordValid] = useState(true);
  const [isdisabled, setdistable] = useState(true);

  useState(() => {
    localStorage.removeItem(localstorage_userInfo);
    localStorage.removeItem(localStorage_userData);
  }, []);

  // const handleClickShowPassword = () => {
  //   setValues({ ...values, showPassword: !values.showPassword });
  // };

  // const newhandleClickShowPassword = () => {
  //   setValues({ ...values, newshowPassword: !values.newshowPassword });
  // };

  const handlePasswordChange = (prop) => (event) => {
    setisPasswordValid(passwordValidator(event.target.value));
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleConformPasswordChange = (prop) => (event) => {
    setisPasswordValid(passwordValidator(event.target.value));
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    let ispasswordValid = passwordValidator(values.password);
    console.log(values.conformPassword, values.password);
    if (values.password.length > 0 && ispasswordValid) {
      if (values.password.length > 0) {
        if (values.password === values.conformPassword) {
          setdistable(false);
        } else {
          setdistable(true);
        }
      }
    }
  }, [values.conformPassword, values.password]);

  const handleLogin = () => {
    const resData = {
      password: values.password,
      confirm_password: values.conformPassword,
    };

    if (!values.password.length > 0) {
      setErrors(true);
    }

    if (values.password.length > 0 && ispasswordValid) {
      if (values.password.length > 0) {
        if (values.password === values.conformPassword) {
          dispatch(resetPassword(resData, token, Navigate));
        } else {
          setErrors(true);
        }
      }
    }
  };

  return (
    <div className="auth-screen-form-card">
      <h1>RESET PASSWORD</h1>

      <div className="auth-input">
        <label>New Password</label>
        <div className="auth-password">
          <input
            autoComplete="off"
            type={values.showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter New password"
            value={values.password}
            onChange={handlePasswordChange("password")}
          />
          <button
            onClick={() =>
              setValues((prev) => ({
                ...prev,
                showPassword: !prev.showPassword,
              }))
            }
            type="button"
            style={{ border: "none", backgroundColor: "transparent" }}
          >
            <img
              src={
                values.showPassword ? "/images/Eye.png" : "/images/Eye-blue.png"
              }
              alt="visible"
              style={{ marginRight: "2px", height: "19px", width: "33px" }}
            />
          </button>
        </div>

        {errors &&
          (!values.password ? (
            <p style={{ color: "red" }}>New Password is required</p>
          ) : null)}
      </div>

      <div className="auth-input">
        <label>Confirm Password</label>
        <div className="auth-password">
          <input
            autoComplete="off"
            type={values.newshowPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Confirm Password"
            value={values.conformPassword}
            onChange={handleConformPasswordChange("conformPassword")}
          />
          <button
            onClick={() =>
              setValues((prev) => ({
                ...prev,
                newshowPassword: !prev.newshowPassword,
              }))
            }
            type="button"
            style={{ border: "none", backgroundColor: "transparent" }}
          >
            <img
              src={
                values.newshowPassword === true
                  ? "/images/Eye.png"
                  : "/images/Eye-blue.png"
              }
              alt="visible"
              style={{ marginRight: "2px", height: "19px", width: "33px" }}
            />
          </button>
        </div>

        {errors ? (
          !values.conformPassword ? (
            <p>Conform Password is required</p>
          ) : null
        ) : null}
        {!ispasswordValid ? (
          <p>
            Password should contain at least 1 Uppercase, 1 lowercase, 1 Special
            Character in (!@#$%^&*),1 Digit, and min 8 Characters{" "}
          </p>
        ) : null}
      </div>
      <button className="auth-btn" disabled={isdisabled} onClick={handleLogin}>
        Reset Password
      </button>
    </div>
  );
}
