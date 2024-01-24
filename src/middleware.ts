// import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

let prevPathname = "";

export async function middleware(req: NextRequest) {
  // const token = await getToken({ req });

  // if (req.nextUrl.pathname.startsWith("/account")) {
  //   if (!token) {
  //     return NextResponse.redirect(new URL(`/auth/signin?callbackUrl=${req.nextUrl}`, req.url));
  //   }
  // }

  if (!req.nextUrl.pathname.startsWith("/auth")) {
    prevPathname = req.nextUrl.pathname;
  }

  if (req.nextUrl.pathname.startsWith("/auth")) {
    const url = new URL(prevPathname, req.url);

    const response = NextResponse.rewrite(url);
    response.headers.set("x-middleware-custom-test", "test");

    if (prevPathname) {
      return response;
    }
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: "/account/:path*",
// };

export const config = {
  matcher: "/((?!api|_next|static|public|favicon.ico).*)",
};
