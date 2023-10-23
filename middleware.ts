import {
  createMiddlewareClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const requestUrl = new URL(req.url);
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (requestUrl.pathname === "/login" && session !== null) {
    return NextResponse.redirect(requestUrl.origin);
  }
  // if (!data.session) {
  //   return NextResponse.redirect(`${requestUrl.origin}/login`);
  // }

  return res;
}

// export const config = {
//   matcher: ["/((?!auth|login|_next/static|_next/image|_next/public).{1,})"],
// };
