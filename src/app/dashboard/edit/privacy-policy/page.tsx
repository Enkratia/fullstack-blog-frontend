import React from "react";
import type { Metadata } from "next";

import { DashboardLayout, EditPrivacyPolicySection1Block } from "../../../../components";

export const metadata: Metadata = {
  title: "Edit: Privacy policy",
};

const DashboardEditPrivacyPolicyPage: React.FC = () => {
  return (
    <DashboardLayout>
      <EditPrivacyPolicySection1Block />
    </DashboardLayout>
  );
};

export default DashboardEditPrivacyPolicyPage;
