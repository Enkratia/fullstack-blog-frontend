import React from "react";

import { AlertBoilerplatePopup } from "../../../../components";

type AlertDeleteQueryPopupProps = {
  onAlertClick: () => void;
};

export const AlertDeleteQueryPopup: React.FC<AlertDeleteQueryPopupProps> = ({ onAlertClick }) => {
  const title = "Failed to delete query!";

  return <AlertBoilerplatePopup onAlertClick={onAlertClick} title={title} />;
};
