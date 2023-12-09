import React from "react";

export const useMediaQuery = () => {
  // NextJS звчем-то запускает хуки на сервере?
  const isWU = typeof window === "undefined" ? true : false;

  // **
  let mdq1024: MediaQueryList | undefined = undefined;
  let mdq896: MediaQueryList | undefined = undefined;

  if (!isWU) {
    mdq1024 = window.matchMedia("(min-width: 1024px)");
    mdq896 = window.matchMedia("(min-width: 896px)");
  }

  const [isMQ1024, setIsMQ1024] = React.useState(isWU ? true : mdq1024?.matches);
  const [isMQ896, setIsMQ896] = React.useState(isWU ? true : mdq896?.matches);

  React.useEffect(() => {
    mdq1024?.addEventListener("change", checkMQ1024);
    mdq896?.addEventListener("change", checkMQ896);
  });

  const checkMQ1024 = () => {
    if (mdq1024?.matches) {
      setIsMQ1024(true);
    } else {
      setIsMQ1024(false);
    }
  };

  const checkMQ896 = () => {
    if (mdq1024?.matches) {
      setIsMQ896(true);
    } else {
      setIsMQ896(false);
    }
  };

  return { isMQ1024, isMQ896 };
};
