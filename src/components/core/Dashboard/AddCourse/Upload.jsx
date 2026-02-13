import React, { useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"
import "video-react/dist/video-react.css"
import { Player } from "video-react"

const Upload = ({
  name,
  label,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) => {
  const [preview, setPreview] = useState(
    viewData ? viewData : editData ? editData : ""
  )

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreview(reader.result)
    }
  }

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      previewFile(file)
      // Set the file in react-hook-form
      setValue(name, file)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"] }
      : { "video/*": [".mp4", ".avi", ".mov", ".mkv"] },
    onDrop,
    maxFiles: 1,
  })

  const handleCancel = (e) => {
    e.stopPropagation()
    setPreview("")
    setValue(name, null)
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-richblack-5 uppercase tracking-wide">
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>

      <div
        {...getRootProps()}
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500 transition-colors`}
      >
        <input {...getInputProps()} />

        {preview ? (
          <div className="flex w-full flex-col p-6">
            {!video ? (
              <img
                src={preview}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              <Player aspectRatio="16:9" playsInline src={preview} />
            )}

            {!viewData && (
              <button
                type="button"
                onClick={handleCancel}
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center p-6">
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>

            <p className="mt-2 max-w-[200px] text-center text-xs text-richblack-200 uppercase tracking-wider">
              Drag and drop an {!video ? "image" : "video"}, or click to
              <span className="font-semibold text-yellow-50"> Browse</span> a
              file
            </p>

            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200 uppercase tracking-wider">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>

      {errors[name] && (
        <span className="text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}

export default Upload
