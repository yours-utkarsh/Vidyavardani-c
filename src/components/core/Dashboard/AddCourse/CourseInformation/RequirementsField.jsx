import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const RequirementsField = ({
  name,
  label,
  register,
  setValue,
  errors,
  getValues,
}) => {

  const { editCourse , course } = useSelector((state) => state.course);
  const [requirement, setRequirement] = useState("");
  const [requirementsList, setRequirementsList] = useState(
    editCourse ? course.requirements : []
  ); 

  useEffect(() => {
    if(editCourse){
      setRequirementsList(course?.requirements || []);
    }
    register(name , {
      required: true,
      validate: (value) => value.length > 0,
    })
  }, [editCourse, course]);

  useEffect(() => {
    setValue(name , requirementsList);
  }, [requirementsList]);


  const handleAddRequirement = () => {
    if(requirement.trim() !== ""){
      setRequirementsList((prev) => [...prev, requirement.trim()]);
      setRequirement("");
    }

  }

  const handleRemoveRequirement = (index) => {
    //* it is also one way to remove the requirement from the list by using filter method

    //!  setRequirementsList((prev) => prev.filter((_, i) => i !== index));
     const updatedRequirements = [...requirementsList]
    updatedRequirements.splice(index, 1)
    setRequirementsList(updatedRequirements)
  }


  return (
    <div className="flex flex-col space-y-2">

      <label className="text-sm text-richblack-5 uppercase tracking-wider" htmlFor={name}>{label}
        <sup className="text-pink-200">*</sup>
      </label>
      
      <div>
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
          className="font-semibold text-yellow-50 uppercase tracking-wider"
        >
          Add
        </button>
      </div>

      {
        requirementsList.length > 0 &&(
          <ul className="mt-2 list-inside list-disc">
           {
            requirementsList.map((requirement, index) => (

              <li>
                <span>{requirement}</span>

                <button
                type='button'
                 className="ml-2 text-xs text-pure-greys-300 "
                 onClick={() => handleRemoveRequirement(index)}
                >
                  Clear
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
          className="ml-2 text-xs tracking-wide text-pink-200"
          >
            {`${label} is required`}
          </span>
        )
      }
      
    </div>
  )
}

export default RequirementsField
