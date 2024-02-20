import React from "react";
import type { Metadata } from "next";

import {
  Header,
  CommonHelper,
  AuthProvider,
  StoreProvider,
  Footer,
  ToastLayout,
} from "../components";

import "./globals.scss";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

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
