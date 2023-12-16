import { ProfileBlock } from "../../../components";

import cs from "../../../scss/helpers.module.scss";

const ProfilePage: React.FC = () => {
  return (
    <div>
      <h1 className={cs.srOnly}>Profile os user</h1>
      <ProfileBlock />
    </div>
  );
};

export default ProfilePage;
