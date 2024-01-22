"use server";

import { revalidatePath } from "next/cache";

export const revaldatePathAction = () => {
  revalidatePath("/", "layout");
};
