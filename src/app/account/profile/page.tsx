import { Metadata } from "next";

import { AccountLayout, ProfileBlock } from "../../../components";

import cs from "../../../scss/helpers.module.scss";

export const metadata: Metadata = {
  title: "Profile",
};

const ProfilePage: React.FC = async () => {
  return (
    <AccountLayout>
      <h1 className={cs.srOnly}>Profile of user</h1>
      <ProfileBlock />
    </AccountLayout>
  );
};

export default ProfilePage;
