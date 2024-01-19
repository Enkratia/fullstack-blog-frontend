import React from "react";

import { useAppSelector } from "../../redux/store";
import { selectAuthLink } from "../../redux/authLinkSlice/selectors";

type AuthLayerProps = {
  children: any;
  testRedirect: (url: string) => void;
};

export const AuthLayer: React.FC<AuthLayerProps> = ({ children, testRedirect }) => {
  // const authLinkPrev = React.useRef("");
  // const authLink = useAppSelector(selectAuthLink);

  // if (authLink && authLink !== authLinkPrev.current) {
  //   // return testRedirect(authLink);
  // }
  // React.useLayoutEffect(() => {
  //   if (authLink && authLink !== authLinkPrev.current) {
  //     testRedirect(authLink);
  //   }
  // }, [authLink]);

  return <div>{children}</div>;
};
