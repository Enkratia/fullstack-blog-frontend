import React from "react";

import { AlertBoilerplatePopup } from "../../../../components";

type AlertDeleteTestimonialPopupProps = {
  onAlertClick: () => void;
};

export const AlertDeleteTestimonialPopup: React.FC<AlertDeleteTestimonialPopupProps> = ({
  onAlertClick,
}) => {
  const title = "Failed to delete testimonial!";

  return <AlertBoilerplatePopup onAlertClick={onAlertClick} title={title} />;
};
