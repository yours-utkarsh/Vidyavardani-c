import React from 'react'
import RenderSteps from './RenderSteps'
import Footer from "../../../common/Footer"

const AddCourse = () => {
  return (
    
      <div className="flex w-full gap-x-6 overflow-hidden">


        <div className="flex flex-1 flex-col min-w-0 px-6 py-10 lg:py-0 lg:px-0">
          <h1 className="mb-14 text-4xl font-bold text-yellow-50 uppercase tracking-wider lg:text-left text-center">
            Add Course
          </h1>

          <div className="flex-1 min-w-0">
            <RenderSteps />
          </div>
        </div>

        {/* Course Upload Tips - Sidebar */}
        <div className="sticky top-10 hidden lg:flex flex-col w-[380px] rounded-lg border border-richblack-700 bg-richblack-800 p-8 overflow-y-auto max-h-[calc(100vh-80px)]">
          <p className="mb-6 text-lg font-semibold text-yellow-50 flex items-center gap-2">
            <span>⚡</span>
            <span>Course Upload Tips</span>
          </p>
          <ul className="space-y-3">
            <li className="text-sm text-richblack-200 leading-relaxed flex gap-3">
              <span className="text-yellow-50 mt-1">•</span>
              <span>Set the Course Price option or make it free.</span>
            </li>
            <li className="text-sm text-richblack-200 leading-relaxed flex gap-3">
              <span className="text-yellow-50 mt-1">•</span>
              <span>Standard size for the course thumbnail is 1024x576.</span>
            </li>
            <li className="text-sm text-richblack-200 leading-relaxed flex gap-3">
              <span className="text-yellow-50 mt-1">•</span>
              <span>Video section controls the course overview video.</span>
            </li>
            <li className="text-sm text-richblack-200 leading-relaxed flex gap-3">
              <span className="text-yellow-50 mt-1">•</span>
              <span>Course Builder is where you create & organize a course.</span>
            </li>
            <li className="text-sm text-richblack-200 leading-relaxed flex gap-3">
              <span className="text-yellow-50 mt-1">•</span>
              <span>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</span>
            </li>
            <li className="text-sm text-richblack-200 leading-relaxed flex gap-3">
              <span className="text-yellow-50 mt-1">•</span>
              <span>Information from the Additional Data section shows up on the course single page.</span>
            </li>
            <li className="text-sm text-richblack-200 leading-relaxed flex gap-3">
              <span className="text-yellow-50 mt-1">•</span>
              <span>Make Announcements to notify all enrolled students at once.</span>
            </li>
          </ul>
        </div>


      </div>
    
  )
}

export default AddCourse
