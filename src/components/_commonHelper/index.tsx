"use client";

import React from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";

import { checkModalHeaderAction } from "../../utils/actions";

import SigninRoot from "../../app/_modalAuth/auth/signin/page";
import SignupRoot from "../../app/_modalAuth/auth/signup/page";
import ForgotRoot from "../../app/_modalAuth/auth/forgot/page";

const modalPages: ModalPagesType = {
  "/auth/signin": <SigninRoot />,
  "/auth/signup": <SignupRoot />,
  "/auth/forgot": <ForgotRoot />,
};

export const CommonHelper: React.FC = () => {
  const pathname = usePathname();

  const [isActive, setIsActive] = React.useState(false);
  const modalPage = modalPages[pathname as ModalPageNamesType[number]];

  // Modal routes
  React.useEffect(() => {
    const checkModalHeader = async () => {
      try {
        const res = await checkModalHeaderAction();
        setIsActive(res);
      } catch (error) {
        console.warn("Failed to get header");
      }
    };

    if (modalPage) {
      checkModalHeader();
    }
  }, [pathname]);

  return <div>{isActive && modalPage && createPortal(modalPage, document?.body, pathname)}</div>;
};

/////////////////////////////////
// For RTK Query
// import { useSession } from "next-auth/react";
// import { useAppDispatch } from "../../redux/store";
// import { removeToken, setToken } from "../../redux/authSlice/slice";

// const dispatch = useAppDispatch();
// const { data: session, status } = useSession();

// React.useEffect(() => {
//   if (session) {
//     dispatch(setToken(session.backendTokens?.accessToken));
//   } else {
//     dispatch(removeToken());
//   }
// }, [session]);
