import React from "react";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { getAuthSession } from "../../utils/authOptions";
import { SignupBlock } from "../../components";

import s from "../signin/signin.module.scss";

type SignupPageProps = {
  searchParams: Record<"callbackUrl", string>;
};

const SignupPage: React.FC<SignupPageProps> = async ({ searchParams }) => {
  const token = await getAuthSession();

  // console.log("token2", !!token);
  // if (token) {
  //   redirect("/");
  // }

  return (
    <div className={s.root}>
      <SignupBlock callbackUrl={searchParams.callbackUrl} />
    </div>
  );
};

export default SignupPage;

// const SignupPage: React.FC<SignupPageProps> = ({ searchParams }) => {
//   const { data: session } = useSession();
//   const router = useRouter();

//   // if (session) {
//   //   router.push("/");
//   // }

//   // React.useLayoutEffect(() => {
//   //   if (session) {
//   //     router.push("/");
//   //   }
//   // }, [session]);

//   // if (session) {
//   //   return null;
//   // }

//   return (
//     <div className={s.root}>
//       <SignupBlock callbackUrl={searchParams.callbackUrl} />
//     </div>
//   );
// };

// export default SignupPage;
