"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "../../redux/store";
import { removeToken, setToken } from "../../redux/authSlice/slice";
import { selectRevalidation } from "../../redux/revalidationSlice/selectors";

import { FRONTEND_URL } from "../../utils/constants";
import { revaldatePathAction } from "../../utils/actions";

export const RoutesProtector: React.FC = () => {
  const isRevalidatePrev = React.useRef<{}>(null);
  const { isRevalidate } = useAppSelector(selectRevalidation);

  const dispatch = useAppDispatch();

  const { data: session, status } = useSession();

  const pathname = usePathname();
  const router = useRouter();

  const sP = useSearchParams().toString();
  const searchParams = sP ? "?" + sP : "";

  const isForbidden = status === "unauthenticated" && !!pathname.match(/^(\/account)/);

  React.useEffect(() => {
    if (isForbidden) {
      router.push(`/auth/signin?callbackUrl=${FRONTEND_URL}${pathname}${searchParams}`, {
        scroll: false,
      });
    }
  }, [isForbidden]);

  const isNotSigninPage = !pathname.startsWith("/auth/signin");
  React.useEffect(() => {
    if (isRevalidate && isNotSigninPage) {
      revaldatePathAction();
    }
  }, [pathname, isRevalidate, isNotSigninPage]);

  // For RTK Query
  React.useEffect(() => {
    if (session) {
      dispatch(setToken(session.backendTokens?.accessToken));
    } else {
      dispatch(removeToken());
    }
  }, [session]);

  return <></>;
};
