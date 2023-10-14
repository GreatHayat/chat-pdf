import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const supabase = createRouteHandlerClient({ cookies });

  await supabase.auth.signOut();

  return NextResponse.redirect(requestUrl.origin, { status: 301 });
}
