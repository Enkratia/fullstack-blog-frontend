import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// nextjs выцепляет имя контейнера вместо hostname в docker production (использовать вместо req.url + заменять req.nextUrl.hostname)
import { FRONTEND_URL } from "./utils/constants";

const adminRoutes: AdminRoutesType = ["/dashboard"];
const protectedRoutes: ProtectedRoutesType = ["/account", "/edit-post"];
const modalPageNames: ModalPageNamesType = ["/auth/signin", "/auth/signup", "/auth/forgot"];

export async function middleware(req: NextRequest) {
  req.nextUrl.hostname = new URL(FRONTEND_URL).hostname;

  const isModalPathname = (pathname: string) => {
    return modalPageNames.find((modalPageName: string) => {
      return pathname.startsWith(modalPageName);
    });
  };

  // **
  const isProtectedCallback = (callbackUrl: string) => {
    return protectedRoutes.find((protectedRouteName: string) => {
      return callbackUrl.startsWith(FRONTEND_URL + protectedRouteName);
    });
  };

  const isAdminCallback = (callbackUrl: string) => {
    return adminRoutes.find((adminRouteName: string) => {
      return callbackUrl.startsWith(FRONTEND_URL + adminRouteName);
    });
  };

  // **
  const isProtectedPathname = (pathname: string) => {
    return protectedRoutes.find((protectedRouteName: string) => {
      return pathname.startsWith(protectedRouteName);
    });
  };

  // **
  const isAdminPathname = (pathname: string) => {
    return adminRoutes.find((adminRouteName: string) => {
      return pathname.startsWith(adminRouteName);
    });
  };

  // **
  const isAuthenticated = async () => {
    const token = await getToken({ req });
    if (!token) return false;

    const refreshTokenExpiresIn = token.backendTokens?.refreshExpiresIn || 0;
    if (Date.now() > refreshTokenExpiresIn) return false;

    return token;
  };

  // **
  const isAdmin = async () => {
    const token = await isAuthenticated();

    if (!token) return false;
    if (!token.user?.isAdmin) return false;

    return true;
  };

  // Routes protector (+modal routes)
  // **
  if (isAdminPathname(req.nextUrl.pathname)) {
    if (!(await isAdmin())) {
      return NextResponse.redirect(
        new URL(`/auth/signin?callbackUrl=${req.nextUrl}`, FRONTEND_URL),
      );
    }
  }

  // **
  if (isProtectedPathname(req.nextUrl.pathname)) {
    if (!(await isAuthenticated())) {
      return NextResponse.redirect(
        new URL(`/auth/signin?callbackUrl=${req.nextUrl}`, FRONTEND_URL),
      );
    }
  }

  // Modal routes
  if (isModalPathname(req.nextUrl.pathname)) {
    const callbackUrl = req.nextUrl.searchParams.get("callbackUrl") || "/";

    if (
      (isProtectedCallback(callbackUrl) && !(await isAuthenticated())) ||
      (isAdminCallback(callbackUrl) && !(await isAdmin()))
    ) {
      return NextResponse.next();
    }

    const url = new URL(callbackUrl, FRONTEND_URL);
    const response = NextResponse.rewrite(url);

    // Differentiate: modal page / 'normal' page
    response.headers.set("x-middleware-custom-modal-header", "custom");
    return response;
  }

  // **
  return NextResponse.next();
}

// Get only real pages
export const config = {
  matcher: "/((?!api|_next|static|public|icon.ico).*)",
};
