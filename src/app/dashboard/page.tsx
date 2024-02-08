import React from "react";

import { DashboardBlock } from "../../components";

const DashboardPage: React.FC = () => {
  return (
    <div>
      <DashboardBlock />
    </div>
  );
};

export default DashboardPage;

// import React from "react";
// import Link from "next/link";

// import { DashboardSidebar } from "../../components";

// import cs from "../../scss/helpers.module.scss";
// import s from "./dashboard.module.scss";

// type DashboardLayoutProps = {
//   children: any;
// };

// const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
//   return (
//     <main className={s.root}>
//       <div className={`${s.container} ${cs.container}`}>
//         <h1 className={s.title}>
//           <Link href="/dashboard" className={s.link}>
//             Dashboard
//           </Link>
//         </h1>

//         <div className={s.content}>
//           <DashboardSidebar />
//           <DashboardBlock />
//         </div>
//       </div>
//     </main>
//   );
// };

// export default DashboardLayout;
