"use server";

import { permanentRedirect, redirect } from "next/navigation";

export const testRedirect = () => {
  redirect("/");
};
