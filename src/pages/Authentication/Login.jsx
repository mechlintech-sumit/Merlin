import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { emailValidator, passwordValidator } from "../../Utils/fieldValidator";
import { localstorage_userInfo } from "../../constants";
import { getContactList } from "../../redux/Actions/authAction";


export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState(false);
  const [isEmailvalid, setIsEmailvalid] = useState(true);
  const [ispasswordValid, setisPasswordValid] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [LoginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    showPassword: false,
    rememberMe: true,
    deviceType: "web",
    deviceUuid: "string",
  });

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem(localstorage_userInfo));
    if (data !== null) {
      setLoginDetails((prevValue) => ({
        ...prevValue,
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      }));
    }
  }, []);

  const emailHandler = (value) => {
    // setIsEmailvalid(emailValidator(value));
    setLoginDetails((prevValue) => ({ ...prevValue, email: value }));
  };

  const passwordHandler = (value) => {
    // setisPasswordValid(passwordValidator(value));
    setLoginDetails((prevValue) => ({ ...prevValue, password: value }));
  };
useEffect(() => {
dispatch(getContactList())
},[])

  return (
    <div className="auth-screen-form-card">
      <h1>Sign In</h1>

      <div className="auth-input">
        <label>Email Address</label>
        <input
          autoComplete="off"
          type="email"
          name="email"
          placeholder="Youraddress@email.com"
          value={LoginDetails.email}
          onChange={(e) => emailHandler(e.target.value)}
        />
        {errors && isEmailvalid ? (
          !LoginDetails.email ? (
            <p>Email is required</p>
          ) : null
        ) : null}
        {!isEmailvalid ? <p>Please enter a valid email.</p> : null}
      </div>

      <div className="auth-input">
        <label>Password</label>
        <div className="auth-password">
          <input
            autoComplete="off"
            type={LoginDetails.showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={LoginDetails.password}
            onChange={(e) => passwordHandler(e.target.value)}
          />
          <button
            onClick={() =>
              setLoginDetails((prev) => ({
                ...prev,
                showPassword: !prev.showPassword,
              }))
            }
            type="button"
            style={{ border: "none", backgroundColor: "transparent" }}
          >
            <img
              src={
                LoginDetails.showPassword === true
                  ? "/images/Eye.png"
                  : "/images/Eye-blue.png"
              }
              alt="visible"
              style={{ marginRight: "2px", height: "19px", width: "33px" }}
            />
          </button>
        </div>

        {errors && ispasswordValid ? (
          !LoginDetails.password ? (
            <p>Password is required</p>
          ) : null
        ) : null}
        {!ispasswordValid ? (
          <p>
            {/* Password should contain at least 1 Uppercase, 1 lowercase, 1 Special
            Character in (!@#$%^&*),1 Digit, and min 8 Characters{" "} */}
            Please enter valid password
          </p>
        ) : null}
      </div>
      <div className="auth-input-remember-me">
        <input
          checked={LoginDetails.rememberMe}
          className="form-check-input"
          type="checkbox"
          id="remember-me"
          value={LoginDetails.rememberMe}
          onChange={() =>
            setLoginDetails((prevValue) => ({
              ...prevValue,
              rememberMe: !prevValue.rememberMe,
            }))
          }
        />
        <label className="form-check-label" htmlFor="remember-me">
          Remember Me
        </label>
      </div>
      <button
        className="auth-btn"
        // onClick={handleLogin}
        disabled={isProcessing}
      >
        {isProcessing ? "Processing ..." : "LOGIN"}
      </button>
      {/* <div className="forgot-password">
        <p>
          Forgot your password?{" "}
          <span onClick={() => navigate("/ForgotPassword")}>Reset here</span>{" "}
        </p>
      </div> */}
    </div>
  );
}
