import React from "react";
import { SigninBlock } from "../../components";

type SigninPageProps = {
  searchParams: Record<"callbackUrl", string>;
};

const SigninPage: React.FC<SigninPageProps> = ({ searchParams }) => {
  return (
    <div>
      <SigninBlock callbackUrl={searchParams.callbackUrl} />
    </div>
  );
};

export default SigninPage;
