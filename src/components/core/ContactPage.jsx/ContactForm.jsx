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
    formState: { errors , isSubmitSuccessful }
  } = useForm()

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
    if(isSubmitSuccessful){
        reset({
            firstName : "",
            lastName : "",
            eamil : "",
            message : "",
            phoneNo : "",
        })
    }

  } , [reset , isSubmitSuccessful])

  return (
    <form action="">
        
    </form>
  )
};

export default ContactForm;
