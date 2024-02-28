import { Metadata } from "next";
import { PrivacyPolicyBlock, PrivacyPolicyHeader } from "../../components";

import cs from "../../scss/helpers.module.scss";

export const metadata: Metadata = {
  title: "Privacy policy",
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <h1 className={cs.srOnly}>Privacy Policy.</h1>
      <PrivacyPolicyHeader />
      <PrivacyPolicyBlock />
    </main>
  );
}
