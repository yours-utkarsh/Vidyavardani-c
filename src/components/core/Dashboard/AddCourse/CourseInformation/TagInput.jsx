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
    <div className="flex flex-col gap-1">
      
      {/* label  */}
      
      <label 
      
      // className="text-sm text-richblack-5 uppercase tracking-wide"
      htmlFor={name}
      >
        {label}<sup className="text-pink-200">*</sup>
      </label>

      {/* render field  */}
      <div className="flex w-full flex-wrap gap-2 items-start">
        {
            tag.map((tag , index) => (
                <div
                key={index}
                className="flex items-center gap-2 rounded-full bg-yellow-50 px-3 py-1 text-sm text-richblack-900"
                >
                    <span>{tag}</span>
                    <button
                     type="button"
              className="focus:outline-none hover:text-richblack-800 transition-colors"
              onClick={() => handleDeleteTag(index)}
                    >
                         <MdClose className="text-sm" />
                    </button>

                </div>
            ))
        }

       <input
       id={name}
       name = {name}
       placeholder={placeholder}
       onKeyDown={handleAddTag}
        className="form-style flex-1 min-w-[200px] placeholder:uppercase placeholder:tracking-wider placeholder:text-sm"
       />
      </div>

      {
        errors[name] && (
            <span className="text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
        )
      }

    </div>
  )
}

export default TagInput
