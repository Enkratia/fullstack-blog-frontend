import { Metadata } from "next";
import { ContactUs } from "../../components";

import cs from "../../scss/helpers.module.scss";

export const metadata: Metadata = {
  title: "Contact us",
};

export default function ContactUsPage() {
  return (
    <main>
      <h1 className={cs.srOnly}>Contact information.</h1>
      <ContactUs />
    </main>
  );
}
