import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { createClient, EmailOtpType } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const supabaseBaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseServiceKey = process.env
  .NEXT_PUBLIC_SUPABASE_SERVICE_KEY as string;

const supabaseClient = createClient(supabaseBaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
});

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url);
  const hashed_token = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType;
  const next = searchParams.get("next") ?? "/";

  if (hashed_token && type) {
    const supabase = createRouteHandlerClient({ cookies });

    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash: hashed_token,
    });

    const { data: subscription } = await supabaseClient
      .from("subscriptions")
      .select()
      .eq("user_id", data.user?.id)
      .single();

    if (!error && subscription?.subscription_status === "active") {
      return NextResponse.redirect(new URL(`/${next.slice(1)}`, req.url));
    }

    return NextResponse.redirect(`${origin}/pricing`);
  }

  return NextResponse.redirect(`${origin}/login`);
}
