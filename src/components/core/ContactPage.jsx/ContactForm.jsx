import React, { useEffect, useState } from "react";
import { apiConnector } from "../../../services/apiconnector";
import { contactusEndpoint } from "../../../services/apis";
import { useForm } from "react-hook-form";

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
          <label htmlFor="firstName">First Name</label>
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



          {/* email  */}
        <div>
          <label htmlFor="message">Message</label>
          <textarea
           rows=
            name="message"
            id="message"
            placeholder="Enter your message "
            className="form-style"
            {...register("message", { required: true })}
          />

          {errors.message && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter email
            </span>
          )}
        </div>






    </form>
  );
};

export default ContactForm;
