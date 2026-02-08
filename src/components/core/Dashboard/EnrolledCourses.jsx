import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI'
import ProgressBar from "@ramonak/react-progress-bar"
import Spinner from '../../common/Spinner'
import convertSecondsToDuration from '../../../Util/secToDuration'
import { useNavigate } from 'react-router-dom'

const EnrolledCourses = () => {

    const navigate = useNavigate()
    const {token} = useSelector(state => state.auth)
    const [enrolledCourses, setEnrolledCourses] = useState(null)
  
    const getEnrolledCourses = async () =>{
        try{
            const response = await getUserEnrolledCourses(token)
            setEnrolledCourses(response)
        }
        catch(error){
            console.log("Unable to fetch enrolled courses")
        }
    }
    useEffect(() =>{
        getEnrolledCourses();
    }, [])

  return (
    <div className="bg-richblack-900 text-white mx-0 md:mx-5">

        <h1 className="font-medium text-richblack-5 text-3xl mb-7 md:mb-14">Enrolled Courses</h1>
        {
            !enrolledCourses ? (
                <Spinner />
            )
            :(
                    !enrolledCourses.length ? (
                        <div className="grid h-[250px] w-full place-content-center rounded-md border border-richblack-700 bg-richblack-800">
                            <p className="text-richblack-200 text-center">You have not enrolled in any courses yet</p>
                        </div>
                    )
                    :
                    (
                        <div className="space-y-5">
                            {/* head - desktop only */}
                            <div className="hidden md:grid grid-cols-4 gap-4 rounded-md border-b border-richblack-700 py-2 px-6 bg-richblack-800">
                                <p className="col-span-2 text-sm font-semibold text-richblack-5">Course Name</p>
                                <p className="text-sm font-semibold text-richblack-5">Duration</p>
                                <p className="text-sm font-semibold text-richblack-5">Progress</p>
                            </div>

                            {/* cards */}
                            {
                                enrolledCourses.map((course , index) => (
                                    <div 
                                        key={index}
                                        onClick={() => navigate(`/view-course/${course?._id}`)}
                                        className="cursor-pointer rounded-md border border-richblack-700 bg-richblack-800 p-4 md:p-6 hover:bg-richblack-700 transition-all duration-200"
                                    >
                                        {/* Mobile Title and Description */}
                                        <div className="md:hidden mb-4">
                                            <h3 className="text-lg font-semibold text-richblack-5 mb-2">{course.courseName}</h3>
                                            <p className="text-sm text-richblack-300 mb-3 line-clamp-2">{course.courseDescription}</p>
                                        </div>

                                        {/* Grid Layout */}
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                            {/* Course Info */}
                                            <div className="md:col-span-2 flex items-start gap-4">
                                                <img 
                                                    src={course.thumbnail} 
                                                    alt={course.courseName}
                                                    className="hidden md:block w-[80px] h-[80px] rounded-md object-cover"
                                                />
                                                <div className="hidden md:block">
                                                    <h3 className="text-base font-semibold text-richblack-5 mb-1">{course.courseName}</h3>
                                                    <p className="text-xs text-richblack-300 line-clamp-2">{course.courseDescription}</p>
                                                </div>
                                            </div>
                                            
                                            {/* Duration */}
                                            <div className="flex justify-between md:block">
                                                <p className="md:hidden text-sm font-medium text-richblack-400">Duration:</p>
                                                <p className="text-sm font-medium text-richblack-5">
                                                    {convertSecondsToDuration(course?.totalDuration)}
                                                </p>
                                            </div>
                                            
                                            {/* Progress */}
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center md:block">
                                                    <p className="md:hidden text-sm font-medium text-richblack-400">Progress:</p>
                                                </div>
                                                <div className="w-full">
                                                    <ProgressBar 
                                                        completed={course?.progressPercentage || 0}
                                                        height = "8px"
                                                        isLabelVisible = {false}
                                                        barContainerClassName="h-2 bg-richblack-700"
                                                        completedClassName="bg-caribbeangreen-500"
                                                    />
                                                </div>
                                                <p className="text-xs text-richblack-400 text-right">{course?.progressPercentage || 0}%</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
            )
        }
      
    </div>
  )
}

export default EnrolledCourses
