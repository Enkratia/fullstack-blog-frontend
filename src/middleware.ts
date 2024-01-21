import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  const signupCookie = req.cookies.get("data-cookie-signup");
  const signinCookie = req.cookies.get("data-cookie-signin");

  if (signupCookie) {
    console.log("signupCookie");
  }

  if (signinCookie) {
    console.log("signinCookie");
  }

  let response = NextResponse.next();

  if (req.nextUrl.pathname.startsWith("/account")) {
    if (!token) {
      return NextResponse.redirect(new URL(`/auth/signin?callbackUrl=${req.nextUrl}`, req.url));
    }
  }

  if (signupCookie && req.nextUrl.pathname.startsWith("/auth/signin")) {
    const newUrl = new URL(`/auth/signup?callbackUrl=${req.nextUrl}`, req.url);

    const response = NextResponse.redirect(newUrl, { status: 308 });
    response.cookies.delete("data-cookie-signup");
    response.cookies.delete("data-cookie-signin");
    console.log("signup", Date.now());

    return response;
  }

  if (signinCookie && req.nextUrl.pathname.startsWith("/auth/signup")) {
    const newUrl = new URL(`/auth/signin?callbackUrl=${req.nextUrl}`, req.url);

    const response = NextResponse.redirect(newUrl, { status: 308 });
    response.cookies.delete("data-cookie-signup");
    response.cookies.delete("data-cookie-signin");

    console.log("signin", Date.now());

    return response;
  }

  // if (req.nextUrl.pathname.startsWith("/blog")) {
  //   if (!token) {
  //     return NextResponse.redirect(new URL(`/auth/signin?callbackUrl=${req.nextUrl}`, req.url));
  //   }
  // }

  // if (req.nextUrl.pathname.startsWith("/about-us")) {
  //   if (!token) {
  //     return NextResponse.redirect(new URL(`/auth/signup?callbackUrl=${req.nextUrl}`, req.url));
  //   }
  // }

  // return NextResponse.next();
  return response;
}

// export const config = {
//   matcher: "/account/:path*",
// };
