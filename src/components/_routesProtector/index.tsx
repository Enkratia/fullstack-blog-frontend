"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { useAppDispatch } from "../../redux/store";
import { removeToken, setToken } from "../../redux/authSlice/slice";
// import { selectRevalidation } from "../../redux/revalidationSlice/selectors";

import { FRONTEND_URL } from "../../utils/constants";
import { getTest } from "../../utils/actions";
// import { TestComponent } from "../_testComponent";
// import { revaldatePathAction } from "../../utils/actions";

// type RoutesProtectorProps = {
//   children: any;
// };
import TestRoot from "../../app/modal/auth/signin/page";
import { createPortal } from "react-dom";

export const RoutesProtector: React.FC = () =>
  // { children }
  {
    // const isRevalidatePrev = React.useRef<{}>();
    // const { isRevalidate } = useAppSelector(selectRevalidation);

    const dispatch = useAppDispatch();

    const { data: session, status } = useSession();

    const pathname = usePathname();
    const router = useRouter();

    const sP = useSearchParams().toString();
    const searchParams = sP ? "?" + sP : "";

    const isForbidden = status === "unauthenticated" && !!pathname.match(/^(\/account)/);

    // const isNotSigninPage = !pathname.startsWith("/auth/signin");

    React.useEffect(() => {
      if (isForbidden) {
        router.push(`/auth/signin?callbackUrl=${FRONTEND_URL}${pathname}${searchParams}`, {
          scroll: false,
        });
      }
    }, [isForbidden]);

    // **
    const [isModal, setIsModal] = React.useState(false);
    React.useEffect(() => {
      const testFunc = async () => {
        try {
          const res = await getTest();
          console.log("res", res);
          setIsModal(res);
        } catch {
          console.warn("Failed to get headers");
        }
      };
      if (pathname.startsWith("/auth")) {
        testFunc();
      }
    }, [pathname]);

    // // Ревалидация fetch/server_components при входе в аккаунт: signin() + reinitApp() + router.push() (нужно делать эту ревалидацию строго после завершения router.push(), если до - intercepting route ломается.
    // React.useEffect(() => {
    //   if (isRevalidate && isNotSigninPage) {
    //     revaldatePathAction();
    //     isRevalidatePrev.current = isRevalidate;
    //   }
    // }, [isRevalidate, isNotSigninPage]);

    // For RTK Query
    React.useEffect(() => {
      if (session) {
        dispatch(setToken(session.backendTokens?.accessToken));
      } else {
        dispatch(removeToken());
      }
    }, [session]);

    return (
      <>
        {isModal &&
          pathname.startsWith("/auth") &&
          createPortal(<TestRoot />, document.body, Date.now().toString())}
      </>
    );
  };
