import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import OTPInput from "react-otp-input";
import { sendOtp, signup } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import { setSignupData } from "../slices/authSlice";

const VerifyEmail = () => {
  const { loading, signupData  } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(
    ()=>{
      if(!signupData){
        navigate("/signup")
      }
    },[signupData,navigate]  
  )

  const handleOnSubmit = (e)=>{
    e.preventDefault();

    const {
      accountType, 
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp
    } = signupData

    dispatch(signup( accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp, navigate
));
  }
  return (
    <div>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <div>
          <h1>Verify Email</h1>
          <p>A verification code sent to your Email. Enter your code below</p>
          <form action="" onSubmit={handleOnSubmit} >
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
            <button onClick={() => dispatch(sendOtp(signupData.email , navigate ))} >
              Resend It
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
