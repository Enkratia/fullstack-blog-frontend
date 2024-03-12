import React from "react";
import type { Metadata } from "next";

import { ChangeTestimonialsBlock } from "../../../../components";

export const metadata: Metadata = {
  title: "Change: Testimonials",
};

const DashboardChangeTestimonialsPage: React.FC = () => {
  return <ChangeTestimonialsBlock />;
};

export default DashboardChangeTestimonialsPage;
