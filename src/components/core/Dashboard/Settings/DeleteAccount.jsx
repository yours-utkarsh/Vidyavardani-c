import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {deleteProfile} from "../../../../services/operations/settingsAPI"

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


 async function deletHandler(){
  try{
    dispatch(deleteProfile(token , navigate))
  }
  catch(error){
console.log(" Error Message Delete Account:", error.message )
  }
 }

  return (
    <div>
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
