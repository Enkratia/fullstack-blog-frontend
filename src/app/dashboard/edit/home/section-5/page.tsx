import React from "react";

import { fetchWhyWeStartedQuery } from "../../../../../fetchApi/fetchApi";

import { EditHomeSection5Block } from "../../../../../components";

const EditHomeSection5Page: React.FC = async () => {
  const { data, isError } = await fetchWhyWeStartedQuery();

  if (!data) {
    return;
  }

  return (
    <div>
      <EditHomeSection5Block data={data} />
    </div>
  );
};

export default EditHomeSection5Page;
