import React from "react";

type ModalAuthLayoutProps = {
  children: any;
};

const ModalAuthLayout: React.FC<ModalAuthLayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default ModalAuthLayout;
