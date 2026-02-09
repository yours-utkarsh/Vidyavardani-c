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

          )

          :

          (

          )
        }
      </div>

      {/* error handling  */}
      {
          
      }

    </div>
  )
}

export default Upload
