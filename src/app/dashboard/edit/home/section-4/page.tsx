import React from "react";

import { fetchCategoryDescriptionQuery } from "../../../../../fetchApi/fetchApi";

import { EditHomeSection4Block } from "../../../../../components";

const EditHomeSection4Page: React.FC = async () => {
  const { data, isError } = await fetchCategoryDescriptionQuery();

  if (!data) {
    return;
  }

  return (
    <div>
      <EditHomeSection4Block data={data} />
    </div>
  );
};

export default EditHomeSection4Page;
