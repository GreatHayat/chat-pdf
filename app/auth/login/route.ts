import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get("email"));

  const supabase = createRouteHandlerClient({ cookies });

  const { error } = await supabase.auth.signInWithOtp({
    email,
  });

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=${error.message}`,
      { status: 301 }
    );
  }

  return NextResponse.redirect(
    `${requestUrl.origin}/login?success=Check email to continue the login/register process.`,
    {
      status: 301,
    }
  );
}
