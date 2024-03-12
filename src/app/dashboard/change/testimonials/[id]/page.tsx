import React from "react";
import type { Metadata } from "next";

import { ChangeTestimonialEditBlock } from "../../../../../components";

export const metadata: Metadata = {
  title: "Edit testimonial",
};

const DashboardChangeTestimonialsEditPage: React.FC = () => {
  return <ChangeTestimonialEditBlock />;
};

export default DashboardChangeTestimonialsEditPage;
