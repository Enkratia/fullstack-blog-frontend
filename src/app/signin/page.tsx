import React from "react";
import { redirect } from "next/navigation";

import { SigninBlock } from "../../components";

import { getAuthSession } from "../../utils/authOptions";

import s from "./signin.module.scss";

type SigninPageProps = {
  searchParams: Record<"callbackUrl", string>;
};

const SigninPage: React.FC<SigninPageProps> = async ({ searchParams }) => {
  const token = await getAuthSession();

  return (
    <div className={s.root}>
      <SigninBlock callbackUrl={searchParams.callbackUrl} />
    </div>
  );
};

export default SigninPage;

// import { redirect, useRouter } from "next/navigation";
// import { revalidatePath } from "next/cache";
// import { useSession } from "next-auth/react";

// import { getAuthSession } from "../../utils/authOptions";

// const token = await getAuthSession();

// if (token) {
//   redirect("/");
// }

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
