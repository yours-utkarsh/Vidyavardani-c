import React from "react";
import Logo1 from "../../../asset/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../asset/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../asset/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../asset/TimeLineLogo/Logo4.svg";
import timeLineImage from "../../../asset/Image/TimelineImage.png";

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
      <div className="flex flex-col lg:flex-row gap-20 mb-20 items-center">
        <div className="lg:w-[45%] flex flex-col gap-14 lg:gap-3">
          {timeline.map((element, index) => {
            return (
              
              <div className="flex flex-col lg:gap-3" key={index}>
                <div className="w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]">
                  <img src={element.Logo} alt={element.Heading} />{" "}
                </div>

                <div className="">
                  <h2 className="font-semibold text-[18px]">
                    {element.Heading}
                  </h2>
                  <p className="text-base">{element.Description}</p>
                </div>

                <div
                  className={`hidden ${
                    timeline.length - 1 === index ? "hidden" : "lg:block"
                  }  h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]`}
                ></div>
              </div>

              

            );
          })}
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
  );
};

export default TimeLineSection;
