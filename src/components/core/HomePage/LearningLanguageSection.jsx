import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from "../../../asset/Image/Know_your_progress.png"
import compare_with_others from "../../../asset/Image/Compare_with_others.png"
import plan_your_lesson from "../../../asset/Image/Plan_your_lessons.png"
import CTAButton from './Button'

const LearningLanguageSection = () => {
  return (
   <div className="">
    <div className="">

    <div className="">
      Your Swiss Knife for 
      <HighlightText text={" learning any language"} ></HighlightText>
    </div>

    <div className="">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, voluptatum dolores voluptate molestiae amet eaque veritatis quisquam ea facere sint! Quae error dolor nam commodi optio voluptatibus nulla inventore minima.
    </div>

    <div className="">
      <img 
      src={know_your_progress}
      alt ="know_your_progress"
      
      />
      <img 
      src={compare_with_others}
      alt ="compare_with_others"

      />
      <img 
      src={plan_your_lesson}
      alt ="plan_your_lesson"
      />
      
    </div>

    <div className="">
      <CTAButton
      active={true} linkto={'./signup'}
      >
        <div>
          Learn More
        </div>
      </CTAButton>
    </div>

    </div>
   </div>
  )
}

export default LearningLanguageSection
