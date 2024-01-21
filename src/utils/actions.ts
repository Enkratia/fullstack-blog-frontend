"use server";

import { revalidatePath } from "next/cache";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";

export const revaldatePathAction = () => {
  revalidatePath("/", "layout");
};

// export const redirectAction = async (url: string) => {
//   revalidatePath("/", "layout");
// };

export const redirectAction = (url: string) => {
  let cookieName = "";
  if (url.startsWith("/auth/signup")) {
    cookieName = "data-cookie-signup";
  }

  if (url.startsWith("/auth/signin")) {
    cookieName = "data-cookie-signin";
  }

  cookies().set({
    name: cookieName,
    value: "test value",
    httpOnly: true,
    // path: "/auth",
    maxAge: 100,
  });
};
