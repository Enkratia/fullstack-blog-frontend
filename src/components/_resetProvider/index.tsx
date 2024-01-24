"use client";

import React from "react";

import { ReinitAppContext } from "../../utils/contexts";
import { revaldatePathAction } from "../../utils/actions";
import { usePathname } from "next/navigation";

type TestLayerProps = {
  children: any;
};

export const ReinitAppProvider: React.FC<TestLayerProps> = ({ children }) => {
  // const prevTest = React.useRef({});
  // const [test, setTest] = React.useState<{}>();

  const [key, setKey] = React.useState(0);

  // const pathname = usePathname();

  // React.useEffect(() => {
  //   if (!test) return;
  //   if (prevTest.current === test) return;
  //   if (pathname.startsWith("/auth")) return;

  //   setTimeout(() => {
  //     revaldatePathAction();
  //   }, 3000);

  //   setTimeout(() => {
  //     setKey((n) => n + 1);
  //   }, 3000);
  //   prevTest.current = test;
  // }, [test, pathname]);

  const reinitApp = () => {
    setKey((n) => n + 1);
    // setTest({});
  };

  return (
    <>
      <ReinitAppContext.Provider key={key} value={reinitApp}>
        {children}
      </ReinitAppContext.Provider>
    </>
  );
};
