import React from "react";

import { SignupBlock } from "../../components";

import s from "../signin/signin.module.scss";

type SignupPageProps = {
  searchParams: Record<"callbackUrl", string>;
};
const SignupPage: React.FC<SignupPageProps> = async ({ searchParams }) => {
  return (
    <div className={s.root}>
      <SignupBlock callbackUrl={searchParams.callbackUrl} />
    </div>
  );
};

export default SignupPage;

// import { getAuthSession } from "../../utils/authOptions";
// const token = await getAuthSession();

// import { redirect, useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import { testRedirect } from "../../components/_testProtector/actions/action";
// console.log("token2", !!token);
// if (token) {
//   redirect("/");
// }

// const SignupPage: React.FC<SignupPageProps> = ({ searchParams }) => {
//   const { data: session } = useSession();

//   const router = useRouter();
//   router.refresh();

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

//   // React.useLayoutEffect(() => {

//   // React.useEffect(() => {
//   //   const url = window.location.href;
//   //   console.log("url", url);
//   //   testRedirect(url);
//   // }, []);
//   // console.log(url);
//   // testRedirect(url);
//   // }, []);

//   return (
//     <div className={s.root}>
//       <SignupBlock callbackUrl={searchParams.callbackUrl} />
//     </div>
//   );
// };

// export default SignupPage;
