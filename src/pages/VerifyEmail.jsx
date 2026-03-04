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

  

   
  }
  return (
     <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
     
    </div>
  );
};

export default VerifyEmail;
