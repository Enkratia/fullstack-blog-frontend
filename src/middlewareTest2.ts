// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   const url = new URL(request.url || "");
//   // console.log(url.pathname);
//   if (url.pathname.startsWith("/signin")) {
//     // console.log("NEW URL", new URL("/home", request.url));
//     return NextResponse.redirect(new URL("/", request.url));
//   }
// }

// // See "Matching Paths" below to learn more
// // export const config = {
// //   matcher: '/about/:path*',
// // }
