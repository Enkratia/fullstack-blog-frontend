import React from "react";
import type { Metadata } from "next";

import { ChangeTestimonialCreateBlock } from "../../../../../components";

export const metadata: Metadata = {
  title: "Create testimonial",
};

const DashboardChangeTestimonialsCreatePage: React.FC = () => {
  return (
    <div>
      <ChangeTestimonialCreateBlock />
    </div>
  );
};

export default DashboardChangeTestimonialsCreatePage;
