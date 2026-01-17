import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import OTPInput from "react-otp-input";

const VerifyEmail = () => {
  const { loading } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  return (
    <div>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <div>
          <h1>Verify Email</h1>
          <p>A verification code sent to your Email. Enter your code below</p>
          <form action="">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => <input {...props} />}
            />
            <button type="submit">Verify Email</button>
          </form>
          <div>
           <div>
                      <Link to="/login" >
                        <p>Back To login</p>
                      </Link>
            </div> 
            <button>
              Resend It
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
