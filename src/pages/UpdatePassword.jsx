import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import { useLocation } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";


const UpdatePassword = () => {

    const dispatch = useDispatch();
    const location = useLocation();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const {password ,confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) =>{
    e.preventDefault();
    const token  = location.pathname.slice('/').at(-1);
    dispatch(resetPassword(password, confirmPassword , token))
  }

  return (
    <div>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <div>
          <h1>Choose New Password</h1>
          <p>Almost done. Enter your new password & you are all set.</p>
          <form onSubmit={handleOnSubmit} >
            <label htmlFor="">
              <p>New Password</p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
              />

            <span onClick={() => setShowPassword((prev) => !prev)} >
              {
                showPassword ?
                <IoEyeOffSharp  fontSize={24} />
                :
                <IoEyeSharp  fontSize={24} />
              }
            </span>

            </label>
            <label htmlFor="">
              <p>Confirm Password</p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
              />
               <span onClick={() => setShowConfirmPassword((prev) => !prev)} >
              {
                showConfirmPassword ?
                <IoEyeOffSharp fontSize={24} />
                :
                <IoEyeSharp  fontSize={24} />
              }
            </span>
            </label>
          </form>
           <div>
                      <Link to="/login" >
                        <p>Back To login</p>
                      </Link>
            </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
