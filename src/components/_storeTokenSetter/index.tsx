"use client";

import React from "react";

import { useAppDispatch } from "../../redux/store";
import { removeToken, setToken } from "../../redux/authSlice/slice";

// **
import { signOut, useSession } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { FRONTEND_URL } from "../../utils/constants";
import { redirectAction, revaldatePathAction } from "../../utils/actions";
import { useResetData } from "../../utils/customHooks";

export const StoreTokenSetter: React.FC = () => {
  const dispatch = useAppDispatch();

  // **
  const { data: session, status } = useSession();
  const prevStatus = React.useRef("");
  const prevId = React.useRef<string>();

  const pathname = usePathname();
  const router = useRouter();

  const sP = useSearchParams().toString();
  const searchParams = sP ? "?" + sP : "";

  const isForbidden = status === "unauthenticated" && !!pathname.match(/^(\/account)/);

  const isExit = prevStatus.current === "authenticated" && status === "unauthenticated";

  const id = session?.user?.id;
  const isNewUser = prevId.current && prevId.current !== id;

  const reInitApp = useResetData();

  // **
  React.useEffect(() => {
    // if (isForbidden && !isExit) {
    //   router.replace(`/auth/signin?callbackUrl=${FRONTEND_URL}${pathname}${searchParams}`, {
    //     scroll: false,
    //   });
    // }
  }, [isForbidden]);

  // *****************************************************************
  // React.useEffect(() => {
  //   if (pathname.startsWith("/auth/signup")) {
  //     redirectAction("/auth/signup");
  //   } else if (pathname.startsWith("/auth/signin")) {
  //     redirectAction("/auth/signin");
  //   }
  // }, [pathname]);
  // *****************************************************************

  // Перезагрузка (сброс данных) при: невозможности обновить токен / выходе через кнопку / когда новый пользователь заходит, не выйдя с прежнего аккаунта (чтобы данные прежнего пользователя не сохранились в кэше у нового)
  React.useEffect(() => {
    if (isExit || isNewUser) {
      // window.location.assign(`http://localhost:3000/account/profile`);
      // signOut({
      //   redirect: false,
      // });
      // console.log("#1");
      // revaldatePathAction();
      // reInitApp();
      // router.push(window.location.href);
    }

    prevStatus.current = status;
    prevId.current = id;
  }, [isExit, isNewUser, status, id]);

  // **
  React.useEffect(() => {
    if (session) {
      dispatch(setToken(session.backendTokens?.accessToken));
    } else {
      dispatch(removeToken());
    }
  }, [session]);

  return <></>;
};
