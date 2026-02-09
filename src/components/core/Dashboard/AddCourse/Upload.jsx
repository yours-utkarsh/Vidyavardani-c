import React from 'react'
import { useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"

import "video-react/dist/video-react.css"
import { Player } from "video-react"

const Upload = ({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) => {

  const [selectedFile , setSelectedFile] = useState(null)
  const [previewSource , setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  )

 
 const inputRef = useRef(null)


  const previewFile = (file) =>{
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () =>{
      setPreviewSource(reader.result)
    }
  }

  


  return (
    <div>
       {/* label  */}

      <label htmlFor=""></label>

     {/* dropzone  */}
      <div
       className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
      >
        {
          previewSource ?
          (
            <div></div>
          )

          :

          (
            <div></div>
          )
        }
      </div>

      {/* error handling  */}
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

export default Upload
