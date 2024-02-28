import React from "react";

import {
  Header,
  AuthProvider,
  StoreProvider,
  Footer,

  // **
  CommonHelper,
  ToastLayout,
  ScrollToTop,
} from "../components";

import "./globals.scss";

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <AuthProvider>
            <CommonHelper />
            <ToastLayout />
            <ScrollToTop />
            <Header />
            {children}
            <Footer />
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;
