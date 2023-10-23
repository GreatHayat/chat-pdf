"use client";

import { createClient } from "@supabase/supabase-js";

const supabaseBaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!;

export default async function Dashboard() {
  const supabaseClient = createClient(supabaseBaseUrl, supabaseServiceKey);

  const { data: files, error: filesError } = await supabaseClient
    .from("files")
    .select("id, file_name");
  return (
    <>
      <h1>Dashboard!</h1>
    </>
  );
}
