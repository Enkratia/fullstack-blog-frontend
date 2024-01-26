"use server";

import { headers, cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// сбросить все серверные данные
export const revaldatePathAction = () => {
  revalidatePath("/", "layout");
};

// прочитать заголок из middleware
export const checkReqHeaderAction = async () => {
  const header = headers().get("x-middleware-custom-auth");
  return !!header;
};
