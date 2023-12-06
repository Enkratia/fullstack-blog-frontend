import React from "react";
import { useRouter } from "next/navigation";

import { setOverflowHidden } from "../../utils/customFunctions";
import { FRONTEND_URL } from "../../utils/constants";

import s from "./modalPC.module.scss";

type ModalPCProps = {
  children: React.ReactNode;
  callbackUrl: string;
};

export const ModalPC: React.FC<ModalPCProps> = ({ children, callbackUrl }) => {
  const router = useRouter();

  React.useEffect(() => {
    setOverflowHidden(true);

    return () => {
      setOverflowHidden(false);
    };
  }, []);

  // **
  const onCloseClick = () => {
    router.push(callbackUrl || FRONTEND_URL);
  };

  // **
  const onModalOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!e.currentTarget.hasAttribute("data-modal-exit")) return;
    e.currentTarget.removeAttribute("data-modal-exit");

    onCloseClick();
  };

  const onModalPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const child = e.currentTarget.firstElementChild as HTMLDivElement;

    if (e.target === e.currentTarget || e.target === child) {
      e.currentTarget.setAttribute("data-modal-exit", "");
    }
  };

  return (
    <div onPointerDown={onModalPointerDown} onClick={onModalOutsideClick} className={s.root}>
      <div className={s.wrapper}>{children}</div>
    </div>
  );
};
