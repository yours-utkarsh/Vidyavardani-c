import React from 'react'
import {useForm} from "react-hook-form" 

const CourseInformationForm = () => {


  return (
    <form action=""
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
      onSubmit={handleSubmit(onSubmit)}
    >

        {/* course title  */}

        <div className="flex flex-col space-y-2">
            <label htmlFor="courseTitle"
            className="text-sm text-richblack-5 uppercase tracking-wider"
            >Course Title<sup 
            className="text-pink-200">*</sup></label>

            <input
            id='courseTitle'
            placeholder='Enter course Title'
            className="form-style w-full placeholder:uppercase placeholder:tracking-wider placeholder:text-sm"
            {...register("courseTitle" , {required : true})}

            >
            {
                errors.CourseTitle && (
                     <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course title is required 
                    </span>
                )
            }
            </input>

        </div>

        {/* Course discription  */}
             <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5 uppercase tracking-wider" htmlFor="courseShortDesc">
          Course Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full placeholder:uppercase placeholder:tracking-wider placeholder:text-sm"
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Description is required
          </span>
        )}
      </div>

        {/* Course price */}
         <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5 uppercase tracking-wider" htmlFor="coursePrice">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style w-full !pl-12 placeholder:uppercase placeholder:tracking-wider placeholder:text-sm"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Price is required
          </span>
        )}
      </div>
        {/* course category  */}
        <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5 uppercase tracking-wider" htmlFor="courseCategory">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("courseCategory", { required: true })}
          defaultValue=""
          id="courseCategory"
          className="form-style w-full uppercase tracking-wider"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            courseCategories?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Category is required
          </span>
        )}
      </div>
        {/* course tags  */}
         <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
        {/* Course thumbnail */}
          <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />
        {/* benefits of course  */}

         <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5 uppercase tracking-wider" htmlFor="courseBenefits">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full placeholder:uppercase placeholder:tracking-wider placeholder:text-sm"
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Benefits of the course is required
          </span>
        )}
      </div>
        {/* Requirement instruction  */}

          <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />
         {/* Next Button */}

    </form>
  )
}

export default CourseInformationForm
