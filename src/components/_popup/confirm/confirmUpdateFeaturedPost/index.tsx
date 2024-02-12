import React from "react";

import { ConfirmBoilerplatePopup } from "../../../../components";

type ConfirmUpdateFeaturedPostProps = {
  onConfirmClick: (value: boolean) => void;
};

export const ConfirmUpdateFeaturedPostPopup: React.FC<ConfirmUpdateFeaturedPostProps> = ({
  onConfirmClick,
}) => {
  const title = "This post will be marked as featured!";

  return <ConfirmBoilerplatePopup onConfirmClick={onConfirmClick} title={title} />;
};
