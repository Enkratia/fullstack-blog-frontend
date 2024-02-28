import React from "react";
import type { Metadata } from "next";

import { ChangeTestimonialsBlock, DashboardLayout } from "../../../../components";

export const metadata: Metadata = {
  title: "Change: Testimonials",
};

const DashboardChangeTestimonialsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <ChangeTestimonialsBlock />
    </DashboardLayout>
  );
};

export default DashboardChangeTestimonialsPage;
