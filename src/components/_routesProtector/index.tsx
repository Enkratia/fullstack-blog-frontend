"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "../../redux/store";
import { removeToken, setToken } from "../../redux/authSlice/slice";

import { FRONTEND_URL } from "../../utils/constants";

type RoutesProtectorProps = {
  children: React.ReactNode;
};

export const RoutesProtector: React.FC<RoutesProtectorProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const prevStatus = React.useRef("");
  const prevId = React.useRef<string>();

  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  // оставить searchParams?
  const sP = useSearchParams().toString();
  const searchParams = sP ? "?" + sP : "";

  const isForbidden = status === "unauthenticated" && !!pathname.match(/^(\/account)/);

  const isExit = prevStatus.current === "authenticated" && status === "unauthenticated";

  const id = session?.user?.id;
  const isNewUser = prevId.current && prevId.current !== id;

  React.useEffect(() => {
    if (isForbidden && !isExit) {
      router.replace(`/signin?callbackUrl=${FRONTEND_URL}${pathname}${searchParams}`, {
        scroll: false,
      });
    }
  }, [isForbidden]);

  // Перезагрузка (сброс данных) при: невозможности обновить токен / выходе через кнопку / когда новый пользователь заходит, не выйдя с прежнего аккаунта (чтобы данные прежнего пользователя не сохранились в кэше у нового)
  React.useEffect(() => {
    if (isExit || isNewUser) {
      // window.location.reload();
      signOut();
    }

    prevStatus.current = status;
    prevId.current = id;
  }, [isExit, isNewUser, status, id]);

  // Add token to RTK Query
  React.useEffect(() => {
    if (session) {
      dispatch(setToken(session?.backendTokens.accessToken));
    } else {
      dispatch(removeToken());
    }
  }, [session]);

  // if (session && pathname.startsWith("/signin")) {
  //   console.log(session, pathname.startsWith("/signin"));
  //   const t = window.location.search;
  //   const callbackUrl = new URLSearchParams(t).get("callbackUrl") || process.env.NEXTAUTH_URL!;
  //   // // // console.log(callbackUrl);
  //   // // router.push(callbackUrl);
  //   // console.log("CHECKING");
  //   router.push(callbackUrl);
  // }

  // console.log(session, pathname.startsWith("/signin"));

  return <div>{children}</div>;
};
