import React from "react";
import Footer from "../components/common/Footer";
import ContactPageForm from "../components/core/ContactPage.jsx/ContactPageForm";
import ContactDetails from "../components/core/ContactPage.jsx/ContactDetails";

const Contact = () => {
  return (
    <div>
      {/* upper page  */}
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row mb-8">
        {/* Contact Details */}
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

         <div className="lg:w-[60%]">
          <ContactPageForm />
        </div>
      </div>

      {/* footer  */}
      <Footer />
    </div>
  );
};

export default Contact;
