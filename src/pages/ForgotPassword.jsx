import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const ForgotPassword = () => {

  const [email , setEmail] = useState("")
  const {loading} = useSelector((state) => state.auth);
  const [emailSent , setEmailSent] = useState(false);

  return (
    <div>
      {
        loading ? (
        <div>

          loading....
        </div>
        ):(
          <div>
            <h1>
              {
                !emailSent ?  "Reset Your Password" :  "check your email"
              }
            </h1>

            <p>
              {
                  !emailSent 
                  ? "Have no fear. We will email you instructions to reset your password. If you don't have your email access we can try account recovery" 
                  : `We have sent the reset email to ${email}`
              }
            </p>

            <form>
              {
                !emailSent && (
                  <label>
                    <p>Email Address</p>
                    <input 
                    type="email"
                    required
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your email address'
                    />
                  </label>
                )
              }
              <button>
                {
                  !emailSent ? "Reset Password " : "Resend Email"
                }
              </button>
            </form>

            <div>
              <Link to="/login" >
              <p>Back To login</p>
              </Link>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default ForgotPassword
