import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const RequirementsField = ({
  name,
  label,
  setValue,
  errors,
}) => {

  const { editCourse , course } = useSelector((state) => state.course);
  const [requirement, setRequirement] = useState("");
  const [requirementsList, setRequirementsList] = useState(
    editCourse && course?.requirements ? course.requirements : []
  ); 

  useEffect(() => {
    if(editCourse && course?.requirements){
      setRequirementsList(course.requirements);
    }
  }, [editCourse, course]);

  useEffect(() => {
    setValue(name, requirementsList);
  }, [requirementsList, setValue, name]);

  const handleAddRequirement = () => {
    if(requirement.trim() !== ""){
      setRequirementsList((prev) => [...prev, requirement.trim()]);
      setRequirement("");
    }
  }

  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...requirementsList]
    updatedRequirements.splice(index, 1)
    setRequirementsList(updatedRequirements)
  }

  return (
    <div className="flex flex-col gap-1">

      <label htmlFor={name}>{label}
        <sup className="text-pink-200">*</sup>
      </label>
      
      <div className="flex gap-2 items-end">
        <input
        type='text'
        id={name}
        value={requirement}
        onChange={(e) => setRequirement(e.target.value)}
         className="form-style w-full"
        />
        <button
         type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-sm px-4 py-2 bg-yellow-50 text-richblack-900 rounded-lg hover:bg-yellow-100 transition-colors whitespace-nowrap"
        >
          Add
        </button>
      </div>

      {
        requirementsList.length > 0 &&(
          <ul className="mt-1 list-inside list-disc space-y-1">
           {
            requirementsList.map((requirement, index) => (

              <li key={index} className="text-sm text-richblack-200">
                <span>{requirement}</span>

                <button
                type='button'
                 className="ml-2 text-xs text-pink-200 hover:text-pink-100 transition-colors"
                 onClick={() => handleRemoveRequirement(index)}
                >
                  Remove
                </button>
              </li>
            ))
           }
          </ul>
        )
      }

      {
        errors[name] && (
          <span
          className="text-xs tracking-wide text-pink-200"
          >
            {errors[name]?.message || `${label} is required`}
          </span>
        )
      }
      
    </div>
  )
}

export default RequirementsField
