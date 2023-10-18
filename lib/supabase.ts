import { createClient } from "@supabase/supabase-js";

const supabaseBaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseServiceKey = process.env
  .NEXT_PUBLIC_SUPABASE_SERVICE_KEY as string;

export const supabaseClient = createClient(supabaseBaseUrl, supabaseServiceKey);
