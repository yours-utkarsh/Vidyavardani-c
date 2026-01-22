import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {deleteProfile} from "../../../../services/operations/settingsAPI"

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token} = useSelector((state) => state.auth)

 async function deletHandler(){
  try{
    dispatch(deleteProfile(token , navigate))
  }
  catch(error){
console.log(" Error Message Delete Account:", error.message )
  }
 }

  return (
    <div className='text-white'>
      <div>

      <div>

      </div>

      {/* button  */}
      <div>
        <button 
        onClick={deletHandler}
        >
          I want to delete my account
        </button>
      </div>

      </div>
    </div>
  )
}

export default DeleteAccount
