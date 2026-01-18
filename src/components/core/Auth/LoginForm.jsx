import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {login} from "../../../services/operations/authAPI"

const LoginForm = () => {
    const dispath = useDispatch()
    const navigate = useNavigate()

    const [formData , setFormData] = useState({
        email : "",
        password : "",
    })

    const [showPassword , setShowPassword ] = useState(false)

    const {email , password} = formData

    const handleOnChange = (e) =>{
        setFormData((prevData) =>({
            ...prevData,
            [e.target.name] : e.target.value
        }))
    }

   const handleOnSubmit = (e) => {
    e.preventDefault();
    dispath(login(email , password , navigate))
   }

  return (
    <form
    onSubmit={handleOnSubmit}
    className="mt-6 flex w-full flex-col gap-y-4"
    >

      
      {/* first field  */}
       <label className="w-full">
         <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Email Address <sup className="text-pink-200">*</sup></p>

        <input 
        type="email"
        required
        name='email'
        value={email}
        onChange={handleOnChange}
        placeholder='Enter your email'
        className='form-style w-full'
        />
        
      </label>

      {/* second field  */}
      <label htmlFor="" className="relative">
         <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Password <sup className="text-pink-200">*</sup></p>
        <input 
        type = {showPassword ? "text" : "password"} 
        required
        name='password'
        value={password}
        onChange={handleOnChange}
        placeholder='Enter your email'
        className='form-style w-full !pr-10'
        />
        <span
        onClick={()=> setShowPassword((prev) => !prev)}
         className="absolute right-3 top-[38px] z-[10] cursor-pointer"
        >
        {
            !showPassword ?( 
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )
        }
        </span>
        <Link to={"/forgot-password"} >
         <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
            Forgot Password
          </p>
        </Link>
        
      </label>

      {/* button  */}
     <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Log In
      </button>
    </form>
  )
}

export default LoginForm
