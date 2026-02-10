import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { IoAddCircleOutline } from "react-icons/io5"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"


import {
  createSection,
  updateSection
} from "../../../../../services/operations/courseDetailsAPI"
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice"
import IconBtn from "../../../../common/IconBtn"
import NestedView from "./NestedView"

const CourseBuilderForm = () => {


 
  return (
    <div>
      <p>Course Builder</p>

      {/* course builder form  */}

      <form onSubmit={handleSubmit(onSubmit)}>

      </form>

      {/* nested view  */}

   
      {/* Next prev button  */}
      
      <div>

    
        
       

      </div>

    </div>
  )
}

export default CourseBuilderForm
