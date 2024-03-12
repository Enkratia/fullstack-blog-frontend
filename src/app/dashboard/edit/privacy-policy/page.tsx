import React from "react";
import type { Metadata } from "next";

import { EditPrivacyPolicySection1Block } from "../../../../components";

export const metadata: Metadata = {
  title: "Edit: Privacy policy",
};

const DashboardEditPrivacyPolicyPage: React.FC = () => {
  return <EditPrivacyPolicySection1Block />;
};

export default DashboardEditPrivacyPolicyPage;
