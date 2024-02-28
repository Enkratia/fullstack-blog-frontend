import React from "react";
import type { Metadata } from "next";

import { ChangeTestimonialsBlock } from "../../../../components";

export const metadata: Metadata = {
  title: "Change: Testimonials",
};

const DashboardChangeTestimonialsPage: React.FC = () => {
  return (
    <div>
      <ChangeTestimonialsBlock />
    </div>
  );
};

export default DashboardChangeTestimonialsPage;
