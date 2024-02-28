import React from "react";
import type { Metadata } from "next";

import { ChangeTestimonialEditBlock, DashboardLayout } from "../../../../../components";

export const metadata: Metadata = {
  title: "Edit testimonial",
};

const DashboardChangeTestimonialsEditPage: React.FC = () => {
  return (
    <DashboardLayout>
      <ChangeTestimonialEditBlock />
    </DashboardLayout>
  );
};

export default DashboardChangeTestimonialsEditPage;
