import React from "react";
import { revalidatePath, revalidateTag } from "next/cache";

import { fetchUserByIdQuery } from "../../fetchApi/fetchApi";
import { ProfileForm } from "../../components";
import { getAuthSession } from "../../utils/authOptions";

import cs from "../../scss/helpers.module.scss";
import s from "./profileBlock.module.scss";

export const ProfileBlock: React.FC = async () => {
  const session = await getAuthSession();

  if (!session) return;

  const { data, isError } = await fetchUserByIdQuery(session.user.id);

  return (
    <section className={s.root}>
      <h2 className={`${s.title} ${cs.title}`}>Profile</h2>
      <ProfileForm user={data} />
    </section>
  );
};
