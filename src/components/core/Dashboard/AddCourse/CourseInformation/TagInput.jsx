import { useEffect, useState } from "react"
import { MdClose } from "react-icons/md"
import { useSelector } from "react-redux"

const TagInput = ({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) => {

    const { editCourse , course } = useSelector((state) => state.course);
    const [tag, setTag] = useState(editCourse ? course.tags : []);
    
    useEffect(() => {
        if(editCourse){
            setTag(course?.tags || []);
        }
        register(name , {
            required: true,
            validate: (value) => value.length > 0,
        })

    } , [editCourse, course]);

    useEffect(() => {
        setValue(name , tag);
    }, [tag]);

    const handleAddTag = (e) => {
       if(e.key === "Enter" || e.key === ","){
        e.preventDefault()

        const tagValue = e.target.value.trim()
        
        if(tagValue && !tag.includes(tagValue) ){
            const newTag = [...tag , tagValue]
            setTag(newTag)
            e.target.value = ""

        }

       }

    }

    const handleDeleteTag = (index) =>{
        const newTags = tag.filter((_, i) => i !== index)
        setTag(newTags)
    }

  return (
    <div>
      
      {/* label  */}
      
      <label className="text-sm text-richblack-5 uppercase tracking-wider"
      htmlFor={name}
      >
        {label}<sup className="text-pink-200">*</sup>
      </label>

      {/* render field  */}
      <div className="flex w-full flex-wrap gap-y-2">
        {
            tag.map((tag , index) => {
                <div
                key={index}
                className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
                >
                    {tag}
                    <button
                     type="button"
              className="ml-2 focus:outline-none"
              onClick={() => handleDeleteTag(index)}
                    >
                         <MdClose className="text-sm" />
                    </button>

                </div>
            })
        }

       <input
       id={name}
       name = {name}
       placeholder={placeholder}
       onKeyDown={handleAddTag}
        className="form-style w-full placeholder:uppercase placeholder:tracking-wider placeholder:text-sm"
       />
      </div>

      {
        errors[name] && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
        )
      }

    </div>
  )
}

export default TagInput
