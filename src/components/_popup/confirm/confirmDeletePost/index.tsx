import React from "react";

import { ConfirmBoilerplatePopup } from "../../../../components";

type ConfirmDeletePostPopupProps = {
  onConfirmClick: (value: boolean) => void;
};

export const ConfirmDeletePostPopup: React.FC<ConfirmDeletePostPopupProps> = ({
  onConfirmClick,
}) => {
  const title = "This post will be deleted Permanently!";

  return <ConfirmBoilerplatePopup onConfirmClick={onConfirmClick} title={title} />;
};
