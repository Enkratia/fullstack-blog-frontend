import React from "react";

import { fetchFooterBottomQuery } from "../../../../fetchApi/fetchApi";

import { EditFooterSection1Block } from "../../../../components";

const DashboardEditFooterPage: React.FC = async () => {
  const { data, isError } = await fetchFooterBottomQuery();

  if (!data) {
    return;
  }

  return (
    <div>
      <EditFooterSection1Block data={data} />
    </div>
  );
};

export default DashboardEditFooterPage;
