import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import DeleteAccount from './DeleteAccount'
import UpdateProfilePassword from './UpdateProfilePassword'
import UpdateProfile from './UpdateProfile'


const Settings = () => {
  return (
   <div className='bg-richblack-900 text-white mx-0 md:mx-5 flex flex-col gap-y-5 md:gap-y-7'>
      <h1 className='font-medium text-richblack-5 text-3xl mb-5 uppercase tracking-wider lg:text-left text-center' >Edit Profile</h1>

      <ChangeProfilePicture/>
      <UpdateProfile/>
      <UpdateProfilePassword/>
      <DeleteAccount/>
      
    </div>
  )
}

export default Settings
