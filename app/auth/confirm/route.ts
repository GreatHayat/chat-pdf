import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { EmailOtpType } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url);
  const hashed_token = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType;
  const next = searchParams.get("next") ?? "/";

  if (hashed_token && type) {
    const supabase = createRouteHandlerClient({ cookies });

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash: hashed_token,
    });
    if (!error) {
      return NextResponse.redirect(new URL(`/${next.slice(1)}`, req.url));
    }
  }

  return NextResponse.redirect(`${origin}/login`);
}
