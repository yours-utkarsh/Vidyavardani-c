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

  const { register , handleSubmit , setValue , formState: { errors}} = useForm();

  const { course } = useSelector((state) => state.course)
  const {token} = useSelector((state) => state.auth)
  const [loading , setLoading] = useState(false)
  const [editSectionName , setEditSectionName] =  useState(null)
  const dispatch = useDispatch()


  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName", "")
  }

  
  const onSubmit = async (data) => {

    setLoading(true)

    let result
// & when we want to edit a section
    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      )

    } 
// & when we want to create a section
    else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      )
    }
    if (result) {

      dispatch(setCourse(result))
      setEditSectionName(null)
      setValue("sectionName", "")
    }
    setLoading(false)
  }


  const goToNext = () => {
     if (course.courseContent.length === 0) {
      toast.error("Please add atleast one section")
      return
    }
    
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section")
      return
    }

    dispatch(setStep(3))

  }

  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }

  return (
    <div>
      <p>Course Builder</p>

      {/* course builder form  */}

      <form onSubmit={handleSubmit(onSubmit)}>

      </form>

      {/* nested view  */}

      {
        course.courseContent.length > 0 && (
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
        ) 
      }
      
      {/* Next prev button  */}
      
      <div>

        <button  onClick={goBack}
         className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
        >
          Back
        </button>
        
        <IconBtn
        disabled={loading}
        text="Next"
        onClickHandler={goToNext}
        >
            <MdNavigateNext />
        </IconBtn>

      </div>

    </div>
  )
}

export default CourseBuilderForm
