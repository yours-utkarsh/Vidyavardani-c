import React from 'react'
import { useNavigate } from 'react-router-dom'


const ProfileDropdown = () => {
  const navigate = useNavigate();
  return (
    <div className='text-white'>
      <button onClick={()=> navigate("/dashboard/my-profile")} >

      Utkarsh
      </button>
    </div>
  )
}

export default ProfileDropdown
