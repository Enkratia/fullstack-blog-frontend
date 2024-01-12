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
  const prevStatus = React.useRef("");

  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const sP = useSearchParams().toString();
  const searchParams = sP ? "?" + sP : "";

  const isForbidden = status === "unauthenticated" && !!pathname.match(/^(\/account)/);

  const isExit = prevStatus.current === "authenticated" && status === "unauthenticated";

  React.useEffect(() => {
    if (isForbidden && !isExit) {
      router.replace(`/signin?callbackUrl=${FRONTEND_URL}${pathname}${searchParams}`, {
        scroll: false,
      });
    }
  }, [isForbidden]);

  // Перезагрузка (сброс данных) при: невозможности обновить токен / выходе через кнопку (чтобы данные прежнего пользователя не сохранились в кэше у нового)
  React.useEffect(() => {
    if (isExit) {
      window.location.reload();
    }

    prevStatus.current = status;
  }, [isExit, status]);

  // Add token to RTK Query
  React.useEffect(() => {
    if (session) {
      dispatch(setToken(session?.backendTokens.accessToken));
    } else {
      dispatch(removeToken());
    }
  }, [session]);

  return <span></span>;
};
