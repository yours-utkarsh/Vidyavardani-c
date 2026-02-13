import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../Util/constants"
import IconBtn from "../../../../common/IconBtn"
import Upload from "../Upload"
import TagInput from "./TagInput"
import RequirementsField from "./RequirementsField"

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      courseTags: [],
      courseRequirements: [],
    }
  });

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);

  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);

      const categories = await fetchCourseCategories();
      if (categories.length > 0) {
        setCourseCategories(categories);
      }
      setLoading(false);
    };

    if (editCourse && course) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.Tags || []);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.requirements || []);
      setValue("courseImage", course.thumbnail);
    }

    getCategories();
  }, [editCourse, course, setValue]);

  const isFormUpdated = () => {
    if (!course) return false;
    
    // the way to find the intermediate value of form
    const currentValues = getValues();

    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== (course.Tags || []).toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory?._id !== course.category?._id ||
      currentValues.courseRequirements.toString() !==
        (course.requirements || []).toString() ||
      currentValues.courseImage !== course.thumbnail
    )
      return true;
    else return false;
  };

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    console.log("Errors:", errors);

    // Validation checks for manually handled fields
    if (!data.courseImage) {
      toast.error("Please upload a course thumbnail");
      return;
    }

    if (!data.courseTags || data.courseTags.length === 0) {
      toast.error("Please add at least one tag");
      return;
    }

    if (!data.courseRequirements || data.courseRequirements.length === 0) {
      toast.error("Please add at least one requirement");
      return;
    }

    if (editCourse) {
      if (isFormUpdated()) {
        console.log("Form was updated");
        const formData = new FormData();
        formData.append("courseId", course._id);
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("Tags", JSON.stringify(data.courseTags));
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("requirements", JSON.stringify(data.courseRequirements));
        formData.append("thumbnailImage", data.courseImage);
        
        setLoading(true);
        try {
          const result = await editCourseDetails(formData, token);
          if (result) {
            dispatch(setCourse(result));
            dispatch(setStep(2));
            toast.success("Course updated successfully");
          }
        } catch (error) {
          console.error("Error updating course:", error);
          toast.error("Failed to update course");
        } finally {
          setLoading(false);
        }
      } else {
        toast.error("No Changes made to the form");
      }
      return;
    }

    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("thumbnailImage", data.courseImage);
    
    console.log("FormData prepared, making API call...");
    setLoading(true);

    try {
      const result = await addCourseDetails(formData, token);
      console.log("API Response Result:", result);

      if (result) {
        console.log("Result received, dispatching setStep(2)");
        dispatch(setCourse(result));
        // Dispatch setStep after a small delay to ensure state updates properly
        setTimeout(() => {
          dispatch(setStep(2));
          console.log("Step set to 2");
        }, 100);
      } else {
        console.error("No result returned from API");
        toast.error("Failed to create course");
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
      toast.error("Error creating course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      action=""
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* course title  */}

      <div className="flex flex-col space-y-2">
        <label
          htmlFor="courseTitle"
          className="text-sm text-richblack-5 uppercase tracking-wider"
        >
          Course Title<sup className="text-pink-200">*</sup>
        </label>

        <input
          id="courseTitle"
          placeholder="Enter course Title"
          className="form-style w-full placeholder:uppercase placeholder:tracking-wider placeholder:text-sm"
          {...register("courseTitle", { required: true })}
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course title is required
          </span>
        )}
      </div>

      {/* Course discription  */}
      <div className="flex flex-col space-y-2">
        <label
          className="text-sm text-richblack-5 uppercase tracking-wider"
          htmlFor="courseShortDesc"
        >
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
        <label
          className="text-sm text-richblack-5 uppercase tracking-wider"
          htmlFor="coursePrice"
        >
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
        <label
          className="text-sm text-richblack-5 uppercase tracking-wider"
          htmlFor="courseCategory"
        >
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
      <TagInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        errors={errors}
        setValue={setValue}
      />
      {/* Course thumbnail */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />
      {/* benefits of course  */}

      <div className="flex flex-col space-y-2">
        <label
          className="text-sm text-richblack-5 uppercase tracking-wider"
          htmlFor="courseBenefits"
        >
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
        setValue={setValue}
        errors={errors}
      />
      {/* Next Button */}

      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue Without Saving
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
          type="submit"
          customClasses="flex items-center gap-x-2"
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  );
};

export default CourseInformationForm;
