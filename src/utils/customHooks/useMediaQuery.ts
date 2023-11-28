import React from "react";

export const useMediaQuery = () => {
  // NextJS звчем-то запускает хуки на сервере?
  if (typeof window === "undefined") {
    return { isMQ1024: true };
  }

  // **
  let mdq1024 = window.matchMedia("(min-width: 1024px)");
  const [isMQ1024, setIsMQ1024] = React.useState(mdq1024.matches);

  React.useEffect(() => {
    mdq1024.addEventListener("change", checkMQ1024);
  });

  const checkMQ1024 = () => {
    if (mdq1024.matches) {
      setIsMQ1024(true);
    } else {
      setIsMQ1024(false);
    }
  };

  return { isMQ1024 };
};
