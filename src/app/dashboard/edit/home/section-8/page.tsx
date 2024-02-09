import React from "react";

import { fetchTestimonialStaticQuery } from "../../../../../fetchApi/fetchApi";

import { EditHomeSection8Block } from "../../../../../components";

const EditHomeSection8Page: React.FC = async () => {
  const { data, isError } = await fetchTestimonialStaticQuery();

  if (!data) {
    return;
  }

  return (
    <div>
      <EditHomeSection8Block data={data} />
    </div>
  );
};

export default EditHomeSection8Page;
