"use client";

import { useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {toast } from "react-toastify";


export default function DragAndDrop() {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<any>(null);
  const [files, setFiles] = useState<any>([]);

  function isImage(file: any) {
    return file.type.startsWith("image/");
  }

  function handleChange(e: any) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const imageFile = Array.from(e.target.files).find(isImage);
      if (imageFile) {
        setFiles([imageFile]);
      }
      toast.success("فایل شما با موفقیت بارگذاری شد ✅");
    }
  }
  function handleDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const imageFile = Array.from(e.dataTransfer.files).find(isImage);
      if (imageFile) {
        setFiles([imageFile]);
      }
      toast.success("فایل شما با موفقیت بارگذاری شد ✅");
    }
  }
  

  function handleDragLeave(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function removeFile(fileName: any, idx: any) {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles([]);
    setFiles(newArr);
    toast.info("فایل شما با موفقیت حذف شد ✅");
  }

  function openFileExplorer() {
    inputRef.current.value = "";
    inputRef.current.click();
  }

  return (
    <div
      className={`w-[100%] py-2 px-3 bg-white rounded-md border flex-col justify-center items-center gap-3 inline-flex ${
        files.length === 0
          ? "border-slate-200 border-dashed "
          : " border-slate-950"
      }`}
    >
      <form
        className={`${dragActive ? "bg-blue-400" : ""} ${
          files.some((file: any) => !isImage(file)) ? "" : "cursor-not-allowd"
        } text-center flex flex-col items-center justify-center w-[100%] gap-1 rounded-md bg-opacity-20 `}
        onDragEnter={handleDragEnter}
        onSubmit={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      >
        {files.length === 0 ? (
          <>
            <input
              placeholder="fileInput"
              className="hidden"
              ref={inputRef}
              type="file"
              multiple={true}
              onChange={handleChange}
              accept="image/*"
            />
            <div className="mt-1">
              <svg
                width="76"
                height="75"
                viewBox="0 0 76 75"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_0_4070)">
                  <rect x="0.5" width="75" height="75" rx="6" fill="#F0F9FF" />
                  <path
                    d="M4.52449 53.4914C6.42212 50.2483 10.7997 49.5276 13.6368 51.9911L41 75.75H-8.5L4.52449 53.4914Z"
                    fill="#0099CC"
                    fill-opacity="0.3"
                  />
                  <path
                    d="M32.917 32.5926C34.8109 29.3121 39.2333 28.5859 42.0769 31.0883L92.8287 75.75H8L32.917 32.5926Z"
                    fill="#0099CC"
                  />
                  <circle cx="18.5" cy="15" r="6" fill="#0099CC" />
                </g>
                <defs>
                  <clipPath id="clip0_0_4070">
                    <rect x="0.5" width="75" height="75" rx="6" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="text-center text-black text-opacity-40 font-light flex">
              فایل تصویری خود را اینجا بیندازید یا{" "}
              <span
                className=" text-center text-sky-600 text-base font-normal mr-1 cursor-pointer"
                onClick={openFileExplorer}
              >
                <span>انتخاب کنید</span>
              </span>{" "}
            </div>
          </>
        ) : (
          <>
            <div className="mt-1">
              {files.map((file: any, idx: any) => (
                <div>
                  <img
                    key={idx}
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className=" w-fit mb-2 rounded-md border-2"
                  />
                  <span>{file.name}</span>
                  <DeleteIcon
                    color="error"
                    onClick={() => removeFile(file.name, idx)}
                    className="cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </form>
    </div>
  );
}
