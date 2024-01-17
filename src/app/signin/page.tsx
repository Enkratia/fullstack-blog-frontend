import { headers } from "next/headers";

import React from "react";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { useSession } from "next-auth/react";

import { getAuthSession } from "../../utils/authOptions";
import { SigninBlock } from "../../components";

import s from "./signin.module.scss";

type SigninPageProps = {
  searchParams: Record<"callbackUrl", string>;
};

const SigninPage: React.FC<SigninPageProps> = async ({ searchParams }) => {
  const headersList = headers();
  const header = headersList.get("x-redirect-me");
  console.log("x-redirect-me:", header);
  const token = await getAuthSession();

  // if (token) {
  //   redirect("/");
  // }

  return (
    <div className={s.root}>
      <SigninBlock callbackUrl={searchParams.callbackUrl} />
    </div>
  );
};

export default SigninPage;

// const SigninPage: React.FC<SigninPageProps> = ({ searchParams }) => {
//   const { data: session } = useSession();

//   // if (session) {
//   //   redirect("/");
//   // }

//   // if (session) {
//   //   return null;
//   // }

//   return (
//     <div className={s.root}>
//       <SigninBlock callbackUrl={searchParams.callbackUrl} />
//     </div>
//   );
// };

// export default SigninPage;
