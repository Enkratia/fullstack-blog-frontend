import { Metadata } from "next";

import { fetchPrivacyPolicyQuery } from "../../fetchApi/fetchApi";

import {
  NotFoundOops,
  PrivacyPolicyBlock,
  PrivacyPolicyHeader,
  ToastComponent,
} from "../../components";

import cs from "../../scss/helpers.module.scss";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "Page where you can read our privacy policy",
};

export default async function PrivacyPolicyPage() {
  const { data, isError, args } = await fetchPrivacyPolicyQuery();

  if (!data || isError) {
    return (
      <>
        <NotFoundOops />
        <ToastComponent type="warning" args={args} text="Failed to load some data." />
      </>
    );
  }

  return (
    <main>
      <h1 className={cs.srOnly}>Privacy Policy.</h1>
      <PrivacyPolicyHeader data={data} />
      <PrivacyPolicyBlock data={data} />
    </main>
  );
}
