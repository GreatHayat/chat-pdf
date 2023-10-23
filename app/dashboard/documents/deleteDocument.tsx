"use client";

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
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

type Props = {
  handleDelete: Function | any;
};

export default function DeleteDocument({ handleDelete }: Props) {
  return (
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
              This action cannot be undone. This will permanently delete your
              document and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <Button variant="default" onClick={handleDelete}>
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
