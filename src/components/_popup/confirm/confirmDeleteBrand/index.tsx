import React from "react";

import { ConfirmBoilerplatePopup } from "../../../../components";

type ConfirmDeleteBrandPopupProps = {
  onConfirmClick: (value: boolean) => void;
};

export const ConfirmDeleteBrandPopup: React.FC<ConfirmDeleteBrandPopupProps> = ({
  onConfirmClick,
}) => {
  const title = "This brand will be deleted Permanently!";

  return <ConfirmBoilerplatePopup onConfirmClick={onConfirmClick} title={title} />;
};
