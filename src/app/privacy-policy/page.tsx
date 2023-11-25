import { PrivacyPolicyBlock, PrivacyPolicyHeader } from "../../components";

import cs from "../../scss/helpers.module.scss";

export default function PrivacyPolicyPage() {
  return (
    <main>
      <h1 className={cs.srOnly}>Privacy Policy.</h1>
      <PrivacyPolicyHeader />
      <PrivacyPolicyBlock />
    </main>
  );
}
