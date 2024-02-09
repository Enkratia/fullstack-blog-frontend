import React from "react";

import { fetchJoinQuery } from "../../../../../fetchApi/fetchApi";

import { EditHomeSection9Block } from "../../../../../components";

const EditHomeSection9Page: React.FC = async () => {
  const { data, isError } = await fetchJoinQuery();

  if (!data) {
    return;
  }

  return (
    <div>
      <EditHomeSection9Block data={data} />
    </div>
  );
};

export default EditHomeSection9Page;
