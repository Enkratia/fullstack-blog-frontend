import Link from "next/link";
import React from "react";

import { DashboardBreadcrumbs, DashboardSidebar } from "../../components";

import s from "./dashboardLayoutBlock.module.scss";
import cs from "../../scss/helpers.module.scss";

type DashboardLayoutBlockProps = {
  children: any;
};

export const DashboardLayoutBlock: React.FC<DashboardLayoutBlockProps> = ({ children }) => {
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
