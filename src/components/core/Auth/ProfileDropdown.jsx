import React from 'react'
import { useNavigate } from 'react-router-dom'

ProfileDropdown();

const ProfileDropdown = () => {
  const navigate = useNavigate();
 
  return (
    <div className='text-white'>
      <button onClick={()=> navigate("/dashboard/my-profile")} >
      const a =0;
      a = 9
      Utkarsh gupta
      </button>
    </div>
  )
}



export default ProfileDropdown
