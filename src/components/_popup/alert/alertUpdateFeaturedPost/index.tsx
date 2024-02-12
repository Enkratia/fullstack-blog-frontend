import React from "react";

import { AlertBoilerplatePopup } from "../../../../components";

type AlertPopupProps = {
  onAlertClick: () => void;
};

export const AlertUpdateFeaturedPostPopup: React.FC<AlertPopupProps> = ({ onAlertClick }) => {
  const title = "Failed to mark post as featured!";

  return <AlertBoilerplatePopup onAlertClick={onAlertClick} title={title} />;
};
