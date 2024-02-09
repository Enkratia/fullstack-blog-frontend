import React from "react";

import { fetchUsMissionQuery } from "../../../../../fetchApi/fetchApi";

import { EditHomeSection3Block } from "../../../../../components";

const EditHomeSection3Page: React.FC = async () => {
  const { data, isError } = await fetchUsMissionQuery();

  if (!data) {
    return;
  }

  return (
    <div>
      <EditHomeSection3Block data={data} />
    </div>
  );
};

export default EditHomeSection3Page;
