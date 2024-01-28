"use client";

import React from "react";
import { createPortal } from "react-dom";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { useAppDispatch } from "../../redux/store";
import { removeToken, setToken } from "../../redux/authSlice/slice";

import { checkModalHeaderAction } from "../../utils/actions";

import SigninRoot from "../../app/_modalAuth/auth/signin/page";
import SignupRoot from "../../app/_modalAuth/auth/signup/page";
import ForgotRoot from "../../app/_modalAuth/auth/forgot/page";

interface ModalPagesType {
  [key: string]: React.ReactNode;
}

const modalPages: ModalPagesType = {
  "/auth/signin": <SigninRoot />,
  "/auth/signup": <SignupRoot />,
  "/auth/forgot": <ForgotRoot />,
};

export const CommonHelper: React.FC = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const [isActive, setIsActive] = React.useState(false);
  const modalPage = modalPages[pathname];

  // Modal routes
  React.useEffect(() => {
    const checkModalHeader = async () => {
      try {
        const res = await checkModalHeaderAction();
        setIsActive(res);
      } catch {
        console.warn("Failed to get header");
      }
    };

    if (modalPage) {
      checkModalHeader();
    }
  }, [pathname]);

  // For RTK Query
  React.useEffect(() => {
    if (session) {
      dispatch(setToken(session.backendTokens?.accessToken));
    } else {
      dispatch(removeToken());
    }
  }, [session]);

  return (
    <>{isActive && modalPage && createPortal(modalPage, document?.body, Date.now().toString())}</>
  );
};
