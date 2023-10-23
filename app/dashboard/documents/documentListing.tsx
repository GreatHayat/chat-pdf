"use client";

import { supabaseClient } from "@/lib/supabase";
// import { supabaseClient } from "@/lib/supabase";
// import { supabaseClient } from "@/lib/supabase";
import DeleteDocument from "./deleteDocument";
import { Alert } from "@/components/ui/alert";

type File = {
  id: number;
  file_name: string;
  created_at: string;
};

export default function DocumentListing({ files }: { files: File[] }) {
  // const cookieStore = cookies();
  // const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // if (filesError) {
  //   return (
  //     <div className="px-4 lg:px-40 py-12">
  //       <Alert variant="destructive">{filesError.message}</Alert>
  //     </div>
  //   );
  // }

  const handleDelete = async (id: number) => {
    console.log(id);
  };

  return (
    <>
      <ul className="w-full">
        {files?.map((item: File) => (
          <li
            key={item.id}
            className="flex items-center justify-between mb-2 bg-gray-100 p-2 rounded"
          >
            <span className="truncate">{item.file_name}</span>
            <span className="flex items-center space-x-4">
              <small>{item.created_at}</small>
              <DeleteDocument handleDelete={() => handleDelete(item.id)} />
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
