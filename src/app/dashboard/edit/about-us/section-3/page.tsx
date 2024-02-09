import React from "react";

import { fetchWhyThisBlogQuery } from "../../../../../fetchApi/fetchApi";

import { EditAboutUsSection3Block } from "../../../../../components";

const EditAboutUsSection3Page: React.FC = async () => {
  const { data, isError } = await fetchWhyThisBlogQuery();

  if (!data) {
    return;
  }

  return (
    <div>
      <EditAboutUsSection3Block data={data} />
    </div>
  );
};

export default EditAboutUsSection3Page;
