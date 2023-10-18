"use client";

import React from "react";
import { UploadCloud, X } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  accept: string;
  file: File | null;
  setFile: any;
};

export default function FileInput({ accept, file, setFile }: Props) {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
    setFile(files[0]);
  };

  const handleClearFile = (e: React.MouseEvent) => {
    setFile(null);
    e.stopPropagation();
  };

  return (
    <>
      <div className="flex items-center justify-center w-full">
        {file && (
          <div className="flex items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <p className="text-sm text-ellipsis">{file.name}</p>
            <Button variant="ghost" onClick={(e) => handleClearFile(e)}>
              <X />
            </Button>
          </div>
        )}
        {!file && (
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadCloud className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Only PDF Files (MAX. 2MB)
              </p>
            </div>

            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept={accept}
              onChange={(e) => handleFile(e)}
              disabled={file !== null && true}
            />
          </label>
        )}
      </div>
    </>
  );
}
