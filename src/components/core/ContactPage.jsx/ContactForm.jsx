import React, { useEffect, useState } from "react";
import { apiConnector } from "../../../services/apiconnector";
import { contactusEndpoint } from "../../../services/apis";
import { useForm } from "react-hook-form";
import {countryCode} from "../../../data/countrycode.json"

const ContactForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    try {
      setLoading(true);
      await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
      setLoading(false);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstName: "",
        lastName: "",
        eamil: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form
      className="flex flex-col gap-7"
      onSubmit={handleSubmit(submitContactForm)}
    >
      {/* name  */}
      <div>
        {/* first name  */}
        <div>
          <label htmlFor="firstName" className="lable-style">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter your First Name"
            className="form-style"
            {...register("firstName", { required: true })}
          />

          {errors.firstName && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your name.
            </span>
          )}
        </div>

        {/* lastName  */}
          <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter your Last Name"
            className="form-style"
            {...register("lastName")}
          />

         
        </div>
      </div>

       {/* email  */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your Email "
            className="form-style"
            {...register("email", { required: true })}
          />

          {errors.email && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter email
            </span>
          )}
        </div>


        {/* Country Code  */}
        
        <div>
          {/* code  */}
          <label htmlFor="phonenumber" className="lable-style" >
            Phone Number
          </label>
          <div>
          <select
          type="text"

          {...register("countryCode" , {required: true})}
          >
            {
              countryCode.map((item , key) => { 
                return (

                  <option key ={key } value={item.code}>
                    {item.code} - {item.country}
                  </option>

                )

                
})
            }
          </select>
          </div>

          {/* field  */}
          <div>
            <input
            
            />
            {

            }
          </div>
        </div>



          {/* message  */}
        <div>
          <label htmlFor="message" className="lable-style">Message</label>
          <textarea
           rows="7"
           cols="30"
            name="message"
            id="message"
            placeholder="Enter your message "
            className="form-style"
            {...register("message", { required: true })}
          />

          {errors.message && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Message
            </span>
          )}
        </div>





          <button
          disabled={loading}
          type="submit"
           className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `}
          >
            Send Message
          </button>


    </form>
  );
};

export default ContactForm;
