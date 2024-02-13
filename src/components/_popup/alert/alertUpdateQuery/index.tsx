import React from "react";

import { AlertBoilerplatePopup } from "../../../../components";

type AlertUpdateQueryPopupProps = {
  onAlertClick: () => void;
};

export const AlertUpdateQueryPopup: React.FC<AlertUpdateQueryPopupProps> = ({ onAlertClick }) => {
  const title = "Failed to update query!";

  return <AlertBoilerplatePopup onAlertClick={onAlertClick} title={title} />;
};
