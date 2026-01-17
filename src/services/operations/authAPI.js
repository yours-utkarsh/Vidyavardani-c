import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { setLoading } from "../../slices/authSlice";
import { endpoints } from "../apis";
import { Navigate } from "react-router-dom";

const { SENDOTP_API, SIGNUP_API } = endpoints;

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SENDOTP_API, { email });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("OTP sent successfully");
      navigate("/verify-email");
    } catch {
      toast.error("OTP send failed");
    }

    dispatch(setLoading(false));
  };
}

export function signup(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate,
) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });

      if(!response.data.success){
        throw new Error(response.data.message);
        
      }
      toast.success("Signup successful");
      navigate("/login")

    } catch (error) {
      toast.error("signup failed");
      navigate("/signup")
    }

    dispatch(setLoading(false));
  };
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        endpoints.RESETPASSTOKEN_API,
        { email },
      );
      console.log("reset password token response...", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
    } catch (error) {
      toast.error("Could not send password reset email");
    }
    dispatch(setLoading(false));
  };
}

export function resetPassword(password, confirmPassword, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", endpoints.RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });
      console.log("RESET password response ", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been reset successfully");
    } catch (error) {
      toast.error("Password reset failed");
    }
    dispatch(setLoading(false));
  };
}
