import React from "react";
import { redirect } from "next/navigation";

import { getAuthSession } from "../../utils/authOptions";
import { SignupBlock } from "../../components";

import s from "../signin/signin.module.scss";

type SignupPageProps = {
  searchParams: Record<"callbackUrl", string>;
};

const SignupPage: React.FC<SignupPageProps> = async ({ searchParams }) => {
  const token = await getAuthSession();

  if (token) {
    redirect("/");
  }

  return (
    <div className={s.root}>
      <SignupBlock callbackUrl={searchParams.callbackUrl} />
    </div>
  );
};

export default SignupPage;
