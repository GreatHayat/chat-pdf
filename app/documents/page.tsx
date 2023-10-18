"use client";

import { useState } from "react";
import UploadDocModal from "./uploadDocModal";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

export default function Documents() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isPrivateCheckbox, setIsPrivateCheckbox] = useState<boolean | any>(
    false
  );
  const { toast } = useToast();

  const handleUploadDocument = async () => {
    if (!file) {
      return alert("File is required");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("isPrivate", isPrivateCheckbox);

    try {
      setIsLoading(true);
      const response = await axios.post("/api/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent: any) => {
          const percentage = (progressEvent.loaded * 100) / progressEvent.total;
          setProgress(+percentage.toFixed(2));
        },
      });
      toast({
        title: "Success",
        description: response?.data?.message,
      });
      setIsLoading(false);
      setFile(null);
      setIsDialogOpen(false);
      setProgress(0);
      setIsPrivateCheckbox(false);
    } catch (error: any) {
      setError(error?.response?.data?.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-xl font-medium">Documents</h1>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-4">
        <input
          type="text"
          className="w-full bg-inherit border rounded-md px-4 py-2"
          placeholder="Search documents"
        />

        <UploadDocModal
          file={file}
          error={error}
          setFile={setFile}
          progress={progress}
          isLoading={isLoading}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          handleUploadDocument={handleUploadDocument}
          isPrivateCheckbox={isPrivateCheckbox}
          setIsPrivateCheckbox={setIsPrivateCheckbox}
        />
      </div>
    </>
  );
}
