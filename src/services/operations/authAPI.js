import toast from "react-hot-toast";
import {apiConnector} from "../apiconnector"
import {setLoading} from "../../slices/authSlice"

import {endpoints} from "../apis"
export function getPasswordResetToken(email , setEmailSent)
{
    return async (dispatch)=>{
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST" , endpoints.RESETPASSTOKEN_API , {email});
            console.log("reset password token response...", response)

            if(!response.data.success){
                throw new Error(response.data.message);
                
            }

            toast.success("Reset Email Sent")
            setEmailSent(true)
        }
        catch(error){
            toast.error("Could not send password reset email")
        }
        dispatch(setLoading(false))
    }
}