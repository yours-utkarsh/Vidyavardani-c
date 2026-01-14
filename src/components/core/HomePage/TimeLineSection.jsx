import React from 'react'
import Logo1 from "../../../asset/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../asset/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../asset/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../asset/TimeLineLogo/Logo4.svg"
import timeLineImage from "../../../asset/Image/TimelineImage.png" 

const timeline = [
    
        {
      Logo: Logo1,
      Heading: "Leadership",
      Description: "Fully committed to the success company",
    },
    {
      Logo: Logo2,
      Heading: "Responsibility",
      Description: "Students will always be our top priority",
    },
    {
      Logo: Logo3,
      Heading: "Flexibility",
      Description: "The ability to switch is an important skills",
    },
    {
      Logo: Logo4,
      Heading: "Solve the problem",
      Description: "Code your way to a solution",
    },

    
];

const TimeLineSection = () => {
  return (
    <div>
        <div className="">
            <div className="">
                {
                  timeline.map((element , index) =>{
                    return (
                      <div className='' key={index}>
                        <div className="">
                        <img  src={element.Logo} alt={element.Heading}
                        />                        </div>

                        <div className="">
                          <h2 className="" >
                            {element.Heading}
                          </h2>
                          <p className="">
                            {element.Description }
                          </p>
                        </div>


                      </div>
                    )
                  })
                }

            </div>

            <div className="">
              <img src={timeLineImage} alt="Timeline representation" />

              <div className="">
                <div className="">
                <p className="">10</p>
                <p className="">Years of Experience</p>
              </div>
              
              <div className="">
                <p className="">250</p>
                <p className="">Type of Courses</p>
              </div>
              </div>
            </div>
        </div>
      
    </div>
  )
}

export default TimeLineSection
