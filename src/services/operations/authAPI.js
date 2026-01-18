import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { setLoading } from "../../slices/authSlice";
import { endpoints } from "../apis";

const { SENDOTP_API, SIGNUP_API, LOGIN_API } = endpoints;

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

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup successful");
      navigate("/login");
    } catch (error) {
      toast.error("signup failed");
      navigate("/signup");
    }

    dispatch(setLoading(false));
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {email, password});
       console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Login successful");

      dispatch(setToken(response.data.token))

      const userImage = response?.data?.data?.image 
      ?
      response?.data?.data?.image 
      : `https://api.dicebear.com/6.x/initials/svg?seed=${response.data.data.firstName}${response.data.data.lastName}`

      dispatch(setUser({...response.data.data , image: userImage}))

      // add token to local storage 
      localStorage.setItem("token" , JSON.stringify(response.data.data.token))


      navigate("/dashboard");
    } catch (error) {
      toast.error("login failed");
      navigate("/login");
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
