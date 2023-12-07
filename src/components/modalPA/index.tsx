import React from "react";
import { useRouter } from "next/navigation";

import { setOverflowHidden } from "../../utils/customFunctions";
import { FRONTEND_URL } from "../../utils/constants";

import s from "./modalPA.module.scss";

type ModalPAProps = {
  children: any;
  callbackUrl: string;
};

export const ModalPA: React.FC<ModalPAProps> = ({ children, callbackUrl }) => {
  const router = useRouter();

  React.useEffect(() => {
    setOverflowHidden(true);

    return () => {
      setOverflowHidden(false);
    };
  }, []);

  // **
  const onModalCloseClick = () => {
    router.push(callbackUrl || FRONTEND_URL);
  };

  // **
  const onModalOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!e.currentTarget.hasAttribute("data-modal-exit")) return;
    e.currentTarget.removeAttribute("data-modal-exit");

    onModalCloseClick();
  };

  const onModalPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const child = e.currentTarget.firstElementChild as HTMLDivElement;

    if (e.target === e.currentTarget || e.target === child) {
      e.currentTarget.setAttribute("data-modal-exit", "");
    }
  };

  const newChildren = React.cloneElement(children, {
    onModalCloseClick,
  });

  return (
    <div
      onPointerDown={onModalPointerDown}
      onClick={onModalOutsideClick}
      className={s.root}
      data-modal-auth>
      <div className={s.wrapper}>{newChildren}</div>
    </div>
  );
};
