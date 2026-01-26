import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Banner from "../asset/Image/banner.mp4";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import TimeLineSection from "../components/core/HomePage/TimeLineSection";
import Footer from "../components/common/Footer";
import InstructorSection from "../components/core/HomePage/InstructorSection"
import ExploreMore from "../components/core/HomePage/ExploreMore";

const Home = () => {
  return (
    <div>
      {/* Section -  1*/}

      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
        {/* Become a Instructor Button */}
        <Link to={"/signup"}>
          <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        {/* Heading */}
        <div className="text-center text-4xl font-semibold">
          Empower Your Future with <HighlightText text={"Coding Skills"} />
        </div>

        {/* Sub Heading */}
        <div className="-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-row gap-7">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        {/* Video */}
        <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            muted
            loop
            autoPlay
            className="shadow-[20px_20px_rgba(255,255,255)]"
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* Code Section 1  */}

        <div className="">
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div>
                Unlock your
                <HighlightText text={" coding potential"} /> with our
                interactive lessons.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              active: true,
              btnText: "Continue Lesson",
              link: "/signup",
            }}
            ctabtn2={{
              active: false,
              btnText: "Learn More",
              link: "/signup",
            }}
            codecolor={"text-yellow-25"}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

        {/* Code Section 2 */}

        <div className="">
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div>
                Unlock your
                <HighlightText text={" coding potential"} /> with our
                interactive lessons.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              active: true,
              btnText: "Continue Lesson",
              link: "/signup",
            }}
            ctabtn2={{
              active: false,
              btnText: "Learn More",
              link: "/signup",
            }}
            codecolor={"text-yellow-25"}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

        <ExploreMore/>

      </div>

      
      {/* Section - 2 */}

      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[320px]">
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
            <div className="flex flex-row gap-7 text-white lg:mt-8">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-2">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>

              <CTAButton active={false} linkto={"/signup"}>
                <div className="">Learn More</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
          <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
          <div className="text-4xl font-semibold lg:w-[45%]">
          Get the skills you need for
          <HighlightText text={"Job that is in Demand"} /> 
          </div>  
          <div className="flex flex-col items-start gap-10 lg:w-[40%]">
            <div className="text-[16px]">
The modern educational landscape dictates its own terms. Today, being a competitive specialist requires more than just professional skills.
            </div>
            
            <CTAButton active={true} linkto={"/signup"}>
              Learn More
            </CTAButton>

          </div>
          </div> 
        </div>
        
        <TimeLineSection />
        <LearningLanguageSection />

        {/* View All Courses Section */}
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-center gap-8 mt-16">
            <div className="text-center">
              <h2 className="text-4xl font-semibold mb-4">
                Ready to Start Learning?
              </h2>
              <p className="text-lg text-richblack-300 mb-8">
                Explore our comprehensive course catalog and begin your learning journey today
              </p>
              <div className="flex flex-row gap-7 justify-center">
                <CTAButton active={true} linkto={"/courses"}>
                  <div className="flex items-center gap-2">
                    Browse All Courses
                    <FaArrowRight />
                  </div>
                </CTAButton>
                <CTAButton  active={false} linkto={"/signup"}>
                <span className="text-white">

                  Get Started Free
                </span>
                </CTAButton>
              </div>
            </div>
          </div>

      </div>

      {/* Section - 3 */}

      <div className="">
        <InstructorSection />
        <h2> Review From Other </h2>
      </div>

      {/* Section - 4 */}
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
