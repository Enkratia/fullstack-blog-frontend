import React from "react";

import { ConfirmBoilerplatePopup } from "../../../../components";

type ConfirmDeleteTestimonialPopupProps = {
  onConfirmClick: (value: boolean) => void;
};

export const ConfirmDeleteTestimonialPopup: React.FC<ConfirmDeleteTestimonialPopupProps> = ({
  onConfirmClick,
}) => {
  const title = "This testimonial will be deleted Permanently!";

  return <ConfirmBoilerplatePopup onConfirmClick={onConfirmClick} title={title} />;
};
