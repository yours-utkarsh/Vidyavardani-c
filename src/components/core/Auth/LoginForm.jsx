import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const dispath = useDispatch()
    const navigate = useNavigate()

    const [formData , setFormData] = useState({
        email : "",
        password : "",
    })

    const [showPassword , setShowPassword ] = useState(false)

    const {email , password} = formData

    const handleOnChange = (e) =>{

    }

   const handleOnSubmit = (e) => {
    e.preventDefault();
    dispath(login(email , password , navigate))
   }

  return (
    <form
    onSubmit={handleOnSubmit}
    >

      
      {/* first field  */}
      <label htmlFor="">
        <input 
        type="email"
        required
        name='email'
        value={email}
        onChange={handleOnChange}
        placeholder='Enter your email'
        className='form'
        />
        
      </label>

      {/* second field  */}
      <label htmlFor=""></label>

      {/* button  */}
      <button
      type='submit'
      >
        Log In
      </button>
    </form>
  )
}

export default LoginForm
