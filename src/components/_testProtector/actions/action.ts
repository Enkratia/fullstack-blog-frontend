"use server";

import { redirect } from "next/navigation";

enum RedirectType {
  push = "push",
  replace = "replace",
}

let count = 0;

export const testRedirect = (url: string) => {
  console.log("action", count++);
  redirect(url, RedirectType.replace);
  // redirect(url);
};
