import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../components/common/Spinner";
import { getPasswordResetToken } from "../services/operations/authAPI";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.auth);
  const [emailSent, setEmailSent] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div>
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div>
          <h1>{!emailSent ? "Reset Your Password" : "check your email"}</h1>

          <p>
            {!emailSent
              ? "Have no fear. We will email you instructions to reset your password. If you don't have your email access we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>

          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label>
                <p>Email Address</p>
                <input
                  type="email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                />
              </label>
            )}
            <button>{!emailSent ? "Reset Password " : "Resend Email"}</button>
          </form>

          <div>
            <Link to="/login" onClick={() => setEmailSent(false)}>
              <p>Back To login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
