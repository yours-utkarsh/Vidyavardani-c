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

  const onDrop = () => {
    const file = acceptedFiles[0]
    if(file) {
      previewFile(file)
      setSelectedFile(file)
    }
  }

  const { getInputProps , getRootProps , isDragActive} = useDropzone({
    accept: !video
     ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
      onDrop
  })

  useEffect(() => {
    register(name , {required : true})

  } , [register])


  useEffect(() => {
   setValue(name , selectedFile)

  } , [selectedFile , setValue])

  return (
    <div>
       {/* label  */}

      <label className="text-sm text-richblack-5 uppercase tracking-wider" htmlFor={name}>
        {label} {!viewData && 
        <sup className="text-pink-200">*</sup>}
      </label>


     {/* dropzone  */}
      <div
       className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
      >
        {
          previewSource ?
          (
             <div className="flex w-full flex-col p-6">
              {
                !video ? (
                  <img
                  src={previewSource}
                  alt='Preview'
                  className="h-full w-full rounded-md object-cover"
                  />
                )
                :
                (
                  <Player
                  aspectRatio='16:9' playsInline src={previewSource}

                  />
                )
              }

              {
                !viewData && (
                  <button
                  type='button'
                  onClick={() => {
                    setPreviewSource("")
                    setSelectedFile(null)
                    setValue(name , null)
                  }}
                  className="mt-3 text-richblack-400 underline"
                  >
                    Cancel
                  </button>
                )
              }
            </div>
          )

          :

          (
            <div
            {...getRootProps()}
              className="flex w-full flex-col items-center p-6"
            >
            

            </div>
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
