import { Button } from "@/components/ui/button";
import { uploadDocument } from "@/lib/services";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Testing() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/login");
  }

  const { data, error } = await supabase.from("files").select("*");

  const handleSubmit = async (formData: FormData) => {
    "use server";

    const results = await uploadDocument(formData);
    console.log("RESULTS", results);
    revalidatePath("/testing");
  };

  return (
    <>
      <h1>Testing!!!</h1>
      <form action={handleSubmit}>
        <input
          name="file"
          type="file"
          placeholder="username"
          className="px-4 py-2 bg-inherit border rounded-md"
        />
        <input type="checkbox" name="isPrivate" />
        <Button type="submit">POST</Button>
      </form>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
