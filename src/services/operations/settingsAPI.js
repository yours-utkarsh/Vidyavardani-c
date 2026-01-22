import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { setToken } from "../../slices/authSlice";
import { setUser, setLoading } from "../../slices/profileSlice";
import { settingsEndpoints } from "../apis";

import { logout } from "./authAPI";

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints;

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          // Do NOT set Content-Type for FormData; let axios set the boundary
          Authorization: `Bearer ${token}`,
        },
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Display Picture Updated Successfully");
      // Server may return the updated user under `user` or `data`
      dispatch(setUser(response.data.user || response.data.data));
    } catch (error) {
      console.error(
        "updateDisplayPicture error:",
        error?.response?.data || error?.message,
      );
      toast.error("Could Not Update Display Picture");
    }
    toast.dismiss(toastId);
  };
}

export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    setLoading(true);
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Profile Deleted Successfully");
      dispatch(logout(navigate));
    } catch (error) {
      console.error(
        "delet account error:",
        error?.response?.data || error?.message,
      );
      toast.error("Could Not delet account");
    }
    setLoading(false);
  };
}
