"use client";

import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  files: [
    {
      id: number;
      file_name: string;
      created_at: string;
    }
  ];
  handleDelete: any;
};

export default function DocumentListing({ files, handleDelete }: Props) {
  const { toast } = useToast();

  const deleteDocument = async (id: number) => {
    const result = await handleDelete(id);

    if (result.status === 204) {
      toast({
        title: "Success",
        description: "Document Deleted Successfully",
      });
    }
  };

  return (
    <>
      <ul className="w-full">
        {files?.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between mb-2 bg-gray-100 p-2 rounded"
          >
            <span className="truncate">{item.file_name}</span>
            <span className="flex items-center space-x-4">
              <small>{item.created_at}</small>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost">
                    <TrashIcon className="text-red-600" size={16} />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure to delete this document?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your document and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    {/* <form action={deleteDocument}> */}
                    <input type="hidden" name="id" value={item.id} />
                    <Button
                      variant="default"
                      type="submit"
                      onClick={() => deleteDocument(item.id)}
                    >
                      Continue
                    </Button>
                    {/* </form> */}
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
