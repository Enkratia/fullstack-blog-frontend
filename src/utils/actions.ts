"use server";

import { headers } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";

import type { TagTypesType } from "../redux/backendApi";

// **
export const revalidatePathAction = async (pathname?: string, pathtype?: "layout" | "page") => {
  const name = pathname ?? "/";
  const type = pathtype ?? "layout";

  revalidatePath(name, type);
  return true;
};

// **
export const revalidateTagsAction = async (tags: TagTypesType[]) => {
  tags.forEach((tag) => revalidateTag(tag));
  return true;
};

// Read middleware modal header
export const checkModalHeaderAction = async () => {
  return !!headers().get("x-middleware-custom-modal-header");
};
