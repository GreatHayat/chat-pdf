import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const requestUrl = new URL(req.url);
  const supabase = createMiddlewareClient({ req, res });
  const { data } = await supabase.auth.getSession();

  if (requestUrl.pathname === "/login" && data.session !== null) {
    return NextResponse.redirect(requestUrl.origin);
  }
  if (data.session === null) {
    return NextResponse.redirect(`${requestUrl.origin}/login`);
  }
  return res;
}

export const config = {
  matcher: ["/login", "/pricing"],
};
