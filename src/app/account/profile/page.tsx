import { fetchCategoryDescriptionQuery } from "../../../fetchApi/fetchApi";
import { ProfileBlock } from "../../../components";

import cs from "../../../scss/helpers.module.scss";

const ProfilePage: React.FC = async () => {
  const { data } = await fetchCategoryDescriptionQuery();

  if (!data) {
    return;
  }

  return (
    <div>
      <h1 className={cs.srOnly}>Profile of user</h1>
      <p>{data.economy}</p>
      <ProfileBlock />
    </div>
  );
};

export default ProfilePage;
