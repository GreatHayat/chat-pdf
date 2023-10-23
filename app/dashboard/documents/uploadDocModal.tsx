"use client";

import React, { useState } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import FileInput from "@/components/fileInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertCircle, Upload } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  handleSubmit: Function;
};

export default function UploadDocModal({ handleSubmit }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isPrivateCheckbox, setIsPrivateCheckbox] = useState<boolean | any>(
    false
  );
  const { toast } = useToast();
  const { pending } = useFormStatus();

  const handleUploadDocument = async () => {
    if (!file) {
      return alert("File is required");
    }

    const formData = new FormData();
    formData.append("file", file as File);
    formData.append("isPrivate", isPrivateCheckbox);

    const result = await handleSubmit(formData);

    if (result?.error) {
      setError(result?.message);
      return;
    }
    toast({
      title: "Success",
      description: result?.message,
    });
    setFile(null);
    setIsDialogOpen(false);
    setIsPrivateCheckbox(false);
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={() => setIsDialogOpen(!isDialogOpen)}
    >
      <DialogTrigger asChild>
        <Button className="py-2 w-full lg:w-auto" type="button">
          <Upload className="mr-2 h-4 w-4" /> Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Upload a document</DialogTitle>
        </DialogHeader>
        <form action={handleUploadDocument}>
          <div className="mb-2">
            <FileInput
              name="file"
              file={file}
              setFile={setFile}
              accept="application/pdf"
            />

            <div className="items-top flex space-x-2 mt-4">
              <Checkbox
                name="isPrivate"
                checked={isPrivateCheckbox}
                onCheckedChange={setIsPrivateCheckbox}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Private Document?
                </label>
                <p className="text-xs text-muted-foreground">
                  By selecting this checkbox, This PDF will not be stored on our
                  servers. You will only be able to chat with this document but
                  not view it.
                </p>
              </div>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <DialogFooter className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:justify-center">
            <Button
              className="w-full"
              type="submit"
              aria-disabled={pending}
              disabled={pending}
            >
              {pending && (
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 mr-2 text-black animate-spin dark:text-gray-600 fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              )}
              Upload
            </Button>
            <DialogClose asChild>
              <Button variant="secondary" className="w-full">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
