"use client";

import React from "react";

import { DashboardSidebar } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./dashboard.module.scss";

type DashboardLayoutProps = {
  children: any;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <main className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <h1 className={s.title}>Dashboard</h1>

        <div className={s.content}>
          <DashboardSidebar />
          {children}
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
