"use client";

import { Alert } from "@/components/ui/alert";
import { useSearchParams } from "next/navigation";

export default function LoginMessage() {
  const searchParams = useSearchParams();

  const error = searchParams.get("error");
  const success = searchParams.get("success");

  return (
    <>
      {error && (
        <Alert className="bg-red-200 border border-red-200 text-center text-gray-800 text-sm">
          {error}
        </Alert>
      )}
      {success && (
        <Alert className="bg-green-200 border border-green-200 text-center text-gray-800 text-sm">
          {success}
        </Alert>
      )}
    </>
  );
}
