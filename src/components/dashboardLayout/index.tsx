import React from "react";
import Link from "next/link";

import { DashboardBreadcrumbs, DashboardSidebar } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./dashboardLayout.module.scss";

type DashboardLayoutProps = {
  children: any;
};

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <main className={s.root}>
      <div className={`${s.container} ${cs.container}`}>
        <div className={s.head}>
          <h1 className={s.title}>
            <Link href="/dashboard" className={s.link}>
              Dashboard
            </Link>
          </h1>

          <DashboardBreadcrumbs />
        </div>

        <div className={s.content}>
          <DashboardSidebar />

          {children}
        </div>
      </div>
    </main>
  );
};
