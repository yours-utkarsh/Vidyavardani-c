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

    useEffect(() => )

  return (
    <div>
      
    </div>
  )
}

export default TagInput
