import { useSelector } from "react-redux"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import { convertSecondsToDuration } from "../../../../Util/secToDuration"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import { formatDate } from "../../../../services/formatDate"
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI"
import { COURSE_STATUS } from "../../../../Util/constants"
import ConfirmationModal from "../../../common/ConfirmationModal"
import Spinner from "../../../common/Spinner"


const CoursesTable = ({ courses, setCourses }) => {

  
 


  return (
    <div>
      <Table>




        <Tbody>
        {
        
          :
          (

             courses?.map((course) => (
              <Tr
                key={course?._id}
                className="flex gap-x-10 border-b border-richblack-800 px-6 py-8 gap-4"
              >

                <Td colSpan={1} className="flex flex-1 gap-x-4 p-3">
                
                  <div className="flex flex-col gap-1 justify-between">
                  
                   


                    <p className="text-[12px] text-white tracking-widest uppercase lg:text-left text-center">
                      Created: {formatDate(course?.createdAt || course?.updatedAt)}
                    </p>
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <div className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100 uppercase tracking-wider">
                        <HiClock size={14} />
                        Drafted
                      </div>
                    ) : (
                      <div className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100 uppercase tracking-wider">
                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                          <FaCheck size={8} />
                        </div>
                        Published
                      </div>
                    )}
                  </div>
                </Td>


                <Td className="text-sm font-medium text-richblack-100 mb-1 tracking-wider uppercase">
                  {course?.courseContent?.reduce((acc, sec) => {
                    sec?.subSection?.forEach(sub => {
                      acc += parseFloat(sub?.timeDuration) || 0;
                    });
                    return convertSecondsToDuration(acc);
                  }, 0)}
                </Td>

                <Td className="text-sm font-medium text-richblack-100 mb-1 tracking-wider uppercase">
                  ₹{course.price}
                </Td>

                <Td className="text-sm font-medium text-richblack-100 tracking-wider uppercase">
                  <button
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-course/${course._id}`);
                    }}
                    title="Edit"
                    className="pr-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300 mr- mb-"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => { },
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => { },
                      })
                    }}
                    title="Delete"
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Td>
                
              </Tr>
            ))

          )
        }
        </Tbody>

      </Table>
       {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default CoursesTable
