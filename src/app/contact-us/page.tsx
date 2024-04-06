import { Metadata } from "next";
import { ContactUs } from "../../components";

import cs from "../../scss/helpers.module.scss";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Our contact information: phone, address, email and where you can send us email.",
};

const ContactUsPage: React.FC = () => {
  return (
    <main>
      <h1 className={cs.srOnly}>Contact information.</h1>
      <ContactUs />
    </main>
  );
};

export default ContactUsPage;
