import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  // const token = await getCsrfToken({ req });

  // **
  if (req.nextUrl.pathname.startsWith("/account")) {
    if (!token) {
      return NextResponse.redirect(new URL(`/auth/signin?callbackUrl=${req.nextUrl}`, req.url));
      // const pathname = req.nextUrl.pathname;
      // const search = req.nextUrl.search;

      // return NextResponse.redirect(`http://localhost:3000/auth/signin?callbackUrl=${req.url}`);
    }
  }

  // Modal pages
  // if (req.nextUrl.pathname.startsWith("/auth")) {
  //   const refererPathanme = req.nextUrl.searchParams.get("referer") || "/";

  //   if (refererPathanme.startsWith("/account")) {
  //     return NextResponse.next();
  //   }

  //   const callbackUrl = req.nextUrl.searchParams.get("callbackUrl") || "/";
  //   const url = new URL(callbackUrl, req.url);

  //   const response = NextResponse.rewrite(url);
  //   response.headers.set("x-middleware-custom-auth", "auth");

  //   return response;
  // }

  // **
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next|static|public|favicon.ico).*)",
};

// export const config = {
//   matcher: "/account/:path*",
// };
