import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { setLoading ,setToken  } from "../../slices/authSlice";
import {setUser  } from "../../slices/profileSlice";
import { settingsEndpoints } from "../apis";

const {  UPDATE_DISPLAY_PICTURE_API , UPDATE_PROFILE_API, CHANGE_PASSWORD_API, DELETE_PROFILE_API } = settingsEndpoints


export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          // Do NOT set Content-Type for FormData; let axios set the boundary
          Authorization: `Bearer ${token}`,
        }
      )

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Display Picture Updated Successfully")
      // Server may return the updated user under `user` or `data`
      dispatch(setUser(response.data.user || response.data.data))
    } catch (error) {
      console.error("updateDisplayPicture error:", error?.response?.data || error?.message)
      toast.error("Could Not Update Display Picture")
    }
    toast.dismiss(toastId)
  }
}

