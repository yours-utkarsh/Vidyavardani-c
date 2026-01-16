import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import { useLocation } from "react-router-dom";

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

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = ()

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
            </label>
            <label htmlFor="">
              <p>Confirm Password</p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
              />
            </label>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
