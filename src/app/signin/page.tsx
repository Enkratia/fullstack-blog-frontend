import React from "react";
import { redirect } from "next/navigation";

import { getAuthSession } from "../../utils/authOptions";
import { SigninBlock } from "../../components";

import s from "./signin.module.scss";

type SigninPageProps = {
  searchParams: Record<"callbackUrl", string>;
};

const SigninPage: React.FC<SigninPageProps> = async ({ searchParams }) => {
  const token = await getAuthSession();

  if (token) {
    redirect("/");
  }

  return (
    <div className={s.root}>
      <SigninBlock callbackUrl={searchParams.callbackUrl} />
    </div>
  );
};

export default SigninPage;
