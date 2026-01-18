import React from 'react'
import signupImg from '../asset/Image/signup.webp'
import Template from '../components/core/Auth/Template'
const Signup = () => {
  return (
    <div>
      <Template
      title="Join the millions learning to code with Learnify for free"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={signupImg}
      formType="signup"
      />
    </div>
  )
}

export default Signup
