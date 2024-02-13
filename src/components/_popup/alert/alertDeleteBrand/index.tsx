import React from "react";

import { AlertBoilerplatePopup } from "../../../../components";

type AlertDeleteBrandPopupProps = {
  onAlertClick: () => void;
};

export const AlertDeleteBrandPopup: React.FC<AlertDeleteBrandPopupProps> = ({ onAlertClick }) => {
  const title = "Failed to delete brand!";

  return <AlertBoilerplatePopup onAlertClick={onAlertClick} title={title} />;
};
