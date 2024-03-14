import type { Metadata } from "next";

import { NotFoundPage } from "../components";

export const metadata: Metadata = {
  title: "Not found",
};

// Next.js Bug === link from "not-found" page => "home" page doesn't work
const NotFound: React.FC = () => {
  return (
    <div>
      <NotFoundPage />
    </div>
  );
};

export default NotFound;
