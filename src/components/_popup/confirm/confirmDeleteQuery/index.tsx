import React from "react";

import { ConfirmBoilerplatePopup } from "../../../../components";

type ConfirmDeleteQueryPopupProps = {
  onConfirmClick: (value: boolean) => void;
};

export const ConfirmDeleteQueryPopup: React.FC<ConfirmDeleteQueryPopupProps> = ({
  onConfirmClick,
}) => {
  const title = "This query will be deleted Permanently!";

  return <ConfirmBoilerplatePopup onConfirmClick={onConfirmClick} title={title} />;
};
