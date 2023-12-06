import React from "react";
import { SignupBlock } from "../../components";

type SignupPageProps = {
  searchParams: Record<"callbackUrl", string>;
};

const SignupPage: React.FC<SignupPageProps> = ({ searchParams }) => {
  return (
    <div>
      <SignupBlock callbackUrl={searchParams.callbackUrl} />
    </div>
  );
};

export default SignupPage;
