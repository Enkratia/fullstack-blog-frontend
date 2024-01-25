"use server";

import { headers, cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// сбросить все серверные данные
export const revaldatePathAction = () => {
  const header = cookies().get("x-middleware-custom-test");
  console.log("1", header);

  // cookies().delete("x-middleware-custom-test");
  revalidatePath("/", "layout");
};

// прочитать заголок из middleware
export const checkReqHeaderAction = async () => {
  // const header = headers().get("x-middleware-custom-test");
  // return !!header;
  const header = cookies().get("x-middleware-custom-test");
  console.log("2", header);
  return !!header;
};
