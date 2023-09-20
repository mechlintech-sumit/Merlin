import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/Actions/authAction";
import { emailValidator } from "../../Utils/fieldValidator";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const [useremail, setUserEmail] = useState("");
  const [mailError, setmailError] = useState(true);
  const [showerror, setshowError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = () => {
    if (!useremail.length > 0) {
      setshowError(true);
    }

    if (useremail.length > 0 && mailError) {
      dispatch(forgotPassword(useremail, setIsProcessing));
      // To Do next implementation
    }
  };

  const emailHandler = (value) => {
    setmailError(emailValidator(value));
    setUserEmail(value);
  };

  return (
    <div className="auth-screen-form-card">
      <h1>Forgot password?</h1>
      <p>
        Enter the email address you used when you joined and we'll send you
        instructions to reset your password.
      </p>
      <div className="auth-input">
        <label>Email Address</label>
        <input
          autoComplete="off"
          type="email"
          name="email"
          placeholder="Youraddress@email.com"
          value={useremail}
          onChange={(e) => emailHandler(e.target.value)}
        />
        {mailError ? null : <p>Please enter a valid email.</p>}
        {showerror ? !useremail ? <p>Email is required</p> : null : null}
      </div>
      <button
        className="auth-btn"
        onClick={handleSubmit}
        disabled={isProcessing}
      >
        {isProcessing ? "Processing ..." : "SUBMIT"}
      </button>
    </div>
  );
}
