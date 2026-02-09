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
        const newTags =
    }

  return (
    <div>
      
    </div>
  )
}

export default TagInput
