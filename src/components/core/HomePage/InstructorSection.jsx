import React from 'react'
import Instructor from "../../../asset/Image/Instructor.png"
import CTAButton from "./Button"
import HighlightText from './HighlightText'

const InstructorSection = () => {
  return (
    <div>
        <div className="">

        {/* left  */}
    <div className="">
        <img src={Instructor} alt="Instructor" />
    </div>

        {/* right  */}
        <div className="flex ">
           <div className="">
            Become an 
            <HighlightText text={" Instructor"} />
           </div>

           <p className="">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum praesentium molestias incidunt labore possimus omnis perferendis, dolorem iste necessitatibus.
           </p>
          

            
           <CTAButton active={true} linkto={"./signup"}  >
           Start Learning Today
            </CTAButton>
           

        </div>


        </div>
      
    </div>
  )
}

export default InstructorSection
