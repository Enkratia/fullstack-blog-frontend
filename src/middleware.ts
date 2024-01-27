import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/account", "/dashboard"];

export async function middleware(req: NextRequest) {
  // const token = await getCsrfToken({ req });

  // if (req.nextUrl.pathname.startsWith("/blog")) {
  //   return NextResponse.redirect(new URL(`/`, req.url));
  // }

  console.log(Date.now());

  // Routes protector
  if (req.nextUrl.pathname.startsWith("/account")) {
    const isAuthenticated = await getToken({ req });

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL(`/auth/signin?callbackUrl=${req.nextUrl}`, req.url));
    }
  }
  // return NextResponse.redirect(new URL(`/`, req.url));
  // return NextResponse.redirect("http://localhost:3000");

  // const pathname = req.nextUrl.pathname;
  // const search = req.nextUrl.search;

  // return NextResponse.redirect(`http://localhost:3000/auth/signin?callbackUrl=${req.url}`);
  // return NextResponse.redirect(
  //   `http://localhost:3000/auth/signin?callbackUrl=http://localhost:3000/account/profile`,
  // );

  // Modal pages
  if (req.nextUrl.pathname.startsWith("/auth")) {
    console.log(req);
    const isAuthenticated = await getToken({ req });
    const refererPathname = req.nextUrl.searchParams.get("referer");

    // const isProtected = (currentRouteName: string) => {
    //   return protectedRoutes.find((protectedRouteName) => {
    //     return currentRouteName.startsWith(protectedRouteName);
    //   });
    // };

    // const header = req.headers.get("x-middleware-custom-auth");
    // console.log(header);

    if (isAuthenticated) {
      return NextResponse.next();
    }

    if (refererPathname && refererPathname.startsWith("/account") && !isAuthenticated) {
      return NextResponse.next();
    }

    console.log(req);

    const callbackUrl = req.nextUrl.searchParams.get("callbackUrl") || "/";
    const url = new URL(callbackUrl, req.url);

    const response = NextResponse.rewrite(url);
    response.headers.set("x-middleware-custom-auth", "auth");

    return response;
  }

  // **
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next|static|public|favicon.ico).*)",
};

// export const config = {
//   matcher: "/account/:path*",
// };
