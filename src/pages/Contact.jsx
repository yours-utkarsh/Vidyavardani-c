import React from 'react'
import Footer from '../components/common/Footer'
import ContactPageForm from '../components/core/ContactPage.jsx/ContactPageForm'
import ContactDetails from '../components/core/ContactPage.jsx/ContactDetails'

const Contact  = () => {
  return (
    <div>
     {/* upper page  */}
      <div>
    <div>
      <ContactDetails/>
     </div>

     <div>
     <ContactPageForm />

     </div>
      </div>
      

   


     {/* footer  */}
     <Footer />
    </div>
  )
}

export default Contact
