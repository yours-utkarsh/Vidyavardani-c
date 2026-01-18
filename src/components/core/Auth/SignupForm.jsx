import React from "react";
import { useDispatch, useNavigate } from "react-redux";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { signup } from "../../../services/operations/authAPI";
import { setSignupData } from "../../../slices/authSlice";
import { ACCOUNT_TYPE } from "../../../Util/constants";


const SignupForm = () => {

     const dispath = useDispatch()
     const navigate = useNavigate()
    
        const [formData , setFormData] = useState({
            firstName : "",
            lastName : "",
            email : "",
            password : "",
            confirmPassword : "",
        })
    
        const [accountType , setAccountType] = useState(STUDENT)
        const [showPassword , setShowPassword ] = useState(false)
    
        const {firstName , lastName , email , confirmPassword,  password} = formData
    
        const handleOnChange = (e) =>{
            setFormData((prevData) =>({
                ...prevData,
                [e.target.name] : e.target.value
            }))
        }
    
       const handleOnSubmit = (e) => {
        e.preventDefault();
        dispath(signup(firstName , lastName , email , confirmPassword,  password, navigate))



        setFormData(
          {
            firstName : "",
            lastName : "",
            email : "",
            password : "",
            confirmPassword : "",
        }
        )

        setAccountType(ACCOUNT_TYPE.STUDENT)

       }

       const tabData = [
        {
          id : 1,
          tabName : "Student",
          type: ACCOUNT_TYPE.STUDENT,

        },
        {
          id:2,
          tabName : "Instructor",
          type: ACCOUNT_TYPE.INSTRUCTOR,
        }
       ]
    

  return (
    <div>
      {/* Tab  */}
      <Tab tabData={tabData}  field={accountType} setField={setAccountType} ></Tab>
      <form action="" onSubmit={handleOnSubmit}>
        {/* name  */}
        <div>
          <label htmlFor="">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input 
            type="text" 
            required 
            name="firstName"
            value={firstName}
            onChange={handleOnChange}
            placeholder="Enter your first name"
            />
          </label>


          <label htmlFor="">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input 
            type="text" 
            required 
            name="lastName"
            value={lastName}
            onChange={handleOnChange}
            placeholder="Enter your last name"
            />
          </label>
        </div>

        {/* email  */}
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>

          <input
            type="email"
            required
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter your email"
            className="form-style w-full"
          />
        </label>

        {/* password */}

        <div>
          <label htmlFor="" className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              required
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter your email"
              className="form-style w-full !pr-10"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {!showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            <Link to={"/forgot-password"}>
              <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
                Forgot Password
              </p>
            </Link>
          </label>


          <label htmlFor="" className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              type={showConfirmPassword ? "text" : "password"}
              required
              name="password"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Enter your Password again"
              className="form-style w-full !pr-10"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {!showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
           
          </label>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
