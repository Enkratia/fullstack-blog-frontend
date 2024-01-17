import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  const token = await getToken({ req: request });

  // NextResponse.redirect(new URL(`/`, request.url));

  // // return NextResponse.next({
  // //   request: {
  // //     headers: requestHeaders,
  // //   },
  // // });
  // return NextResponse.next();

  // requestHeaders.set("cache-control", "no-store");
  if (request.nextUrl.pathname.startsWith("/signin")) {
    console.log("is cookie:", !!token);

    if (!!token) {
      requestHeaders.set("x-redirect-me", "no-cache");

      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

      response.cookies.set("x-redirect-me", "cookie-data", { maxAge: 2 });
      return response;
    }

    if (!token) {
      requestHeaders.set("x-redirect-me", "cache");

      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

      response.cookies.set("x-redirect-me", "cookie-info", { maxAge: 2 });
      return response;
    }

    // console.log("no-cache");
    // console.log("Check");
    // return NextResponse.redirect(new URL(`/`, request.url));
    // return NextResponse.rewrite(new URL(`/`, request.url), {
    //   request: {
    //     headers: { "x-middleware-cache": "no-cache" },
    //   },
    //   status: 307,
    // });
  }

  const response = NextResponse.next();
  return response;
}

export const config = {
  matcher: "/signin",
};
