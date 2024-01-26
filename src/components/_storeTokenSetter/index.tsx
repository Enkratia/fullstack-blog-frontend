"use client";

import React from "react";
import { createPortal } from "react-dom";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useAppDispatch } from "../../redux/store";
import { removeToken, setToken } from "../../redux/authSlice/slice";

import { checkReqHeaderAction } from "../../utils/actions";
import { FRONTEND_URL } from "../../utils/constants";

import SigninRoot from "../../app/_modalAuth/auth/signin/page";
import SignupRoot from "../../app/_modalAuth/auth/signup/page";

interface ModalPagesType {
  [key: string]: React.ReactNode;
}

const modalPages: ModalPagesType = {
  "/auth/signin": <SigninRoot />,
  "/auth/signup": <SignupRoot />,
};

export const StoreTokenSetter: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const [isActive, setIsActive] = React.useState(false);
  const modalPage = modalPages[pathname];

  const sP = useSearchParams().toString();
  const searchParams = sP ? "?" + sP : "";

  const isForbidden = status === "unauthenticated" && !!pathname.match(/^(\/account)/);

  // Routes protector
  // React.useEffect(() => {
  //   if (isForbidden) {
  //     router.push(`/auth/signin?callbackUrl=${FRONTEND_URL}${pathname}${searchParams}`, {
  //       scroll: false,
  //     });
  //   }
  // }, [isForbidden]);

  // Parallel routes
  React.useEffect(() => {
    const checkReqHeader = async () => {
      try {
        const res = await checkReqHeaderAction();
        setIsActive(res);
      } catch {
        console.warn("Failed to get header");
      }
    };

    if (modalPage) {
      checkReqHeader();
    }
  }, [pathname]);

  console.log("render");

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
      {isActive &&
        modalPage &&
        document.body &&
        createPortal(modalPage, document.body, Date.now().toString())}
    </>
  );
};
