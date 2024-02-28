import React from "react";
import type { Metadata } from "next";

import { ChangeTestimonialCreateBlock, DashboardLayout } from "../../../../../components";

export const metadata: Metadata = {
  title: "Create testimonial",
};

const DashboardChangeTestimonialsCreatePage: React.FC = () => {
  return (
    <DashboardLayout>
      <ChangeTestimonialCreateBlock />
    </DashboardLayout>
  );
};

export default DashboardChangeTestimonialsCreatePage;
