import type { Metadata } from "next";

import { NotFoundPage } from "../../components";

export const metadata: Metadata = {
  title: "Not found",
};

// Чтобы нивелировать до минимума баг с not-found.tsx (ссылка с него не работает, если переходить на главную старницу) (перепроверить - есть ли баг)
const CatchAllPage: React.FC = () => {
  return <NotFoundPage />;
};

export default CatchAllPage;
