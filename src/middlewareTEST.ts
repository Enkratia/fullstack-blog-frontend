// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// const protectedRoutes: ProtectedRoutesType = ["/account", "/dashboard", "/edit-post"];
// const modalPageNames: ModalPageNamesType = ["/auth/signin", "/auth/signup", "/auth/forgot"];

// export async function middleware(req: NextRequest) {
//   const isModalPathname = (pathname: string) => {
//     return modalPageNames.find((modalPageName: string) => {
//       return pathname.startsWith(modalPageName);
//     });
//   };

//   // **
//   const isProtectedCallback = (callbackUrl: string) => {
//     return protectedRoutes.find((protectedRouteName: string) => {
//       return callbackUrl.startsWith(process.env.NEXTAUTH_URL + protectedRouteName);
//     });
//   };

//   // **
//   const isProtectedPathname = (pathname: string) => {
//     return protectedRoutes.find((protectedRouteName: string) => {
//       return pathname.startsWith(protectedRouteName);
//     });
//   };

//   // **
//   const isAuthenticated = async () => {
//     console.log(req.nextUrl.pathname);

//     const token = await getToken({ req });
//     if (!token) return false;

//     const refreshTokenExpiresIn = token.backendTokens?.refreshExpiresIn || 0;
//     if (Date.now() > refreshTokenExpiresIn) return false;

//     return true;
//   };

//   // Routes protector (+modal routes)
//   if (isProtectedPathname(req.nextUrl.pathname)) {
//     if (!(await isAuthenticated())) {
//       return NextResponse.redirect(new URL(`/auth/signin?callbackUrl=${req.nextUrl}`, req.url));
//     }
//   }

//   // Modal routes
//   if (isModalPathname(req.nextUrl.pathname)) {
//     const callbackUrl = req.nextUrl.searchParams.get("callbackUrl") || "/";

//     if (isProtectedCallback(callbackUrl) && !(await isAuthenticated())) {
//       return NextResponse.next();
//     }

//     const url = new URL(callbackUrl, req.url);
//     const response = NextResponse.rewrite(url);

//     // Differentiate: modal page / 'normal' page
//     response.headers.set("x-middleware-custom-modal-header", "custom");
//     return response;
//   }

//   // **
//   return NextResponse.next();
// }

// // Get only real pages
// export const config = {
//   matcher: "/((?!api|_next|static|public|favicon.ico).*)",
// };
