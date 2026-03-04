import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import OTPInput from "react-otp-input";
import { sendOtp, signup } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { RxCountdownTimer } from "react-icons/rx";
import { BiArrowBack } from "react-icons/bi";

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
  confirmPassword
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
     <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {loading ? (
        <Spinner></Spinner>
      ) : (
          <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
            Verify Email
          </h1>
          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
            A verification code has been sent to you. Enter the code below
          </p>
        
         

        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
