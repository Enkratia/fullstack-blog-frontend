"use server";

import { redirect } from "next/navigation";

enum RedirectType {
  push = "push",
  replace = "replace",
}

export const testRedirect = (url: string) => {
  redirect(url, RedirectType.replace);
};
