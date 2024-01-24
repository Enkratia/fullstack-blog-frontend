"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const revaldatePathAction = () => {
  revalidatePath("/", "layout");
};

export const getTest = async () => {
  const header = headers().get("x-middleware-custom-test");
  console.log(header);
  return !!header;
};
