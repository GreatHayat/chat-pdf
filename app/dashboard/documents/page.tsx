import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Alert } from "@/components/ui/alert";
import { uploadDocument } from "@/lib/services";
import UploadDocModal from "./uploadDocModal";
import DocumentListing from "./documentListing";

export default async function Documents() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/login");
  }

  const { data: files, error } = await supabase.from("files").select("*");

  const handleSubmit = async (formData: FormData) => {
    "use server";

    const results = await uploadDocument(formData);
    revalidatePath("/dashboard/documents");
    return results;
  };

  return (
    <div className="px-4 lg:px-40 py-12">
      <div className="mb-4">
        <h1 className="text-xl font-medium">Documents</h1>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-end gap-4">
        {/* <input
          id="search"
          name="search"
          type="text"
          className="w-full bg-inherit border rounded-md px-4 py-2"
          placeholder="Search documents"
        /> */}

        <UploadDocModal handleSubmit={handleSubmit} />
      </div>

      <div className="mt-4">
        {error && <Alert variant="destructive">{error.message}</Alert>}
        <DocumentListing files={files} />
      </div>
    </div>
  );
}
