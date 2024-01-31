"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

// Reset server data
export const revalidatePathAction = async (pathname?: string, pathtype?: "layout" | "page") => {
  const name = pathname ?? "/";
  const type = pathtype ?? "layout";

  revalidatePath(name, type);
  return true;
};

// Read middleware modal header
export const checkModalHeaderAction = async () => {
  return !!headers().get("x-middleware-custom-modal-header");
};
