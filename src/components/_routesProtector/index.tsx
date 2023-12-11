"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "../../redux/store";
import { removeToken, setToken } from "../../redux/authSlice/slice";

import { FRONTEND_URL } from "../../utils/constants";

export const RoutesProtector: React.FC = () => {
  const dispatch = useAppDispatch();

  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const sP = useSearchParams().toString();
  const searchParams = sP ? "?" + sP : "";

  const isForbidden = status === "unauthenticated" && !!pathname.match(/^(\/account)/);

  React.useLayoutEffect(() => {
    if (isForbidden) {
      router.replace(`/signin?callbackUrl=${FRONTEND_URL}${pathname}${searchParams}`);
    }
  }, [isForbidden]);

  // RTK QUERY
  React.useEffect(() => {
    if (session) {
      dispatch(setToken(session?.backendTokens.accessToken));
    } else {
      dispatch(removeToken());
    }
  }, [status]);

  return <></>;
};
