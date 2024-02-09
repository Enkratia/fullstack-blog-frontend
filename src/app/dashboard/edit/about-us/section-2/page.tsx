import React from "react";

import { fetchKnowMoreQuery } from "../../../../../fetchApi/fetchApi";

import { EditAboutUsSection2Block } from "../../../../../components";

const EditAboutUsSection2Page: React.FC = async () => {
  const { data, isError } = await fetchKnowMoreQuery();

  if (!data) {
    return;
  }

  return (
    <div>
      <EditAboutUsSection2Block data={data} />
    </div>
  );
};

export default EditAboutUsSection2Page;
