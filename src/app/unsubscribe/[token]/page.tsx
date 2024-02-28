import { Metadata } from "next";
import { UnsubscribeBlock } from "../../../components";

import cs from "../../../scss/helpers.module.scss";

type UnsubscribePageProps = {
  params: {
    token: string;
  };
};

export const metadata: Metadata = {
  title: "Unsubscribe",
};

export default function UnsubscribePage({ params: { token } }: UnsubscribePageProps) {
  return (
    <main>
      <h1 className={cs.srOnly}>Page to unsubscribe from email delivering</h1>
      <UnsubscribeBlock token={token} />
    </main>
  );
}
