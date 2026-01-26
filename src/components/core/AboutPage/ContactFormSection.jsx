import React from 'react'
import ContactForm from '../ContactPage.jsx/ContactForm'

const ContactFormSection = () => {
  return (
    <div>
      <div className="mx-auto">
      <h1 className="text-center text-4xl font-semibold">Get in Touch</h1>
      <p className="text-center text-richblack-300 mt-3">
        We&apos;d love to here for you, Please fill out this form.
      </p>
      <div className="mt-12 mx-auto mb-8">
        <ContactForm />
      </div>
    </div>
    </div>
  )
}

export default ContactFormSection
