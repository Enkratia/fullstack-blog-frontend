import React from "react";

import cs from "../../scss/helpers.module.scss";
import s from "./PrivacyPolicyBlock.module.scss";

const policy: PrivacyPolicyType = {
  message: "",
  createdAt: "2023-11-25T16:48:55.329Z",
  updatedAt: "2023-11-25T16:48:55.329Z",
};

export const PrivacyPolicyBlock: React.FC = () => {
  return (
    <section className={s.root}>
      <div className={`${s.container} ${cs.container} ${cs.container768}`}>
        <h1 className={s.articleTitle1}>Lorem ipsum dolor sit amet</h1>

        <p className={s.articleParagraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam
          sem. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis
          parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque
          egestas diam. Risus in hendrerit gravida rutrum quisque non. Sit amet nulla facilisi morbi
          tempus iaculis urna. Lorem sed risus ultricies tristique nulla aliquet enim. Volutpat
          blandit aliquam etiam erat velit. Orci eu lobortis elementum nibh. Ipsum suspendisse
          ultrices gravida dictum fusce ut placerat orci nulla. Neque convallis a cras semper auctor
          neque vitae tempus quam.
        </p>

        <h2 className={s.articleTitle2}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
        </h2>

        <p className={s.articleParagraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris
          in aliquam sem. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et
          magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas
          congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non. Sit amet nulla
          facilisi morbi tempus iaculis urna. Lorem sed risus ultricies tristique nulla aliquet
          enim. Volutpat blandit aliquam etiam erat velit. Orci eu lobortis elementum nibh. Ipsum
          suspendisse ultrices gravida dictum fusce ut placerat orci nulla. Neque convallis a cras
          semper auctor neque vitae tempus quam.
        </p>

        <p className={s.articleParagraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris
          in aliquam sem. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et
          magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas
          congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non. Sit amet nulla
          facilisi morbi tempus iaculis urna. Lorem sed risus ultricies tristique nulla aliquet
          enim. Volutpat blandit aliquam etiam erat velit. Orci eu lobortis elementum nibh. Ipsum
          suspendisse ultrices gravida dictum fusce ut placerat orci nulla. Neque convallis a cras
          semper auctor neque vitae tempus quam.
        </p>
      </div>
    </section>
  );
};
