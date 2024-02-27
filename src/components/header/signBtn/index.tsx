"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import { useMediaQuery } from "../../../utils/customHooks";
import { FRONTEND_URL } from "../../../utils/constants";

import s from "./signInBtn.module.scss";

const modalPageNames: ModalPageNamesType = ["/auth/signin", "/auth/signup", "/auth/forgot"];

const links = [
  {
    segment: "/account/profile",
    title: "Profile",
  },
  {
    segment: "/account/add-post",
    title: "Add post",
  },
  {
    segment: "/account/my-posts",
    title: "My posts",
  },
];

type SignBtnProps = {
  className: string;
  onCloseClick: () => void;
};

export const SignBtn: React.FC<SignBtnProps> = ({ className, onCloseClick }) => {
  const { isMQ896 } = useMediaQuery();

  const { data: session } = useSession();
  const pathname = usePathname();
  const sP = useSearchParams().toString();
  const searchParams = sP ? "?" + sP : "";

  const [isActive, setIsActive] = React.useState(false);

  // **
  const isModalPathname = (pathname: string) => {
    return modalPageNames.find((modalPathanme: string) => {
      return pathname.startsWith(modalPathanme);
    });
  };

  const onSignClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Не переходить на 'modal' page, будучи на 'normal' page (переходить с 'normal' на 'normal')
    if (isModalPathname(pathname)) {
      e.preventDefault();
    }

    // Закрыть модальное окно nav-меню, перед открытием 'modal' page (избежать проблем с наложение/снятием overflow-hidden при >1 открытых модалках)
    onCloseClick();
  };

  // **
  const onDropdownClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget.lastElementChild) return;

    const dropdown = e.currentTarget;
    setIsActive((b) => !b);

    function hideDropdown(e: MouseEvent) {
      if (dropdown && !e.composedPath().includes(dropdown)) {
        setIsActive(false);
        document.documentElement.removeEventListener("click", hideDropdown);
      }
    }

    document.documentElement.addEventListener("click", hideDropdown);
  };

  const onExitClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    await signOut({
      redirect: false,
    });

    window.location.reload();
  };

  // **
  const isAdmin = session?.user?.isAdmin;

  return session ? (
    isMQ896 ? (
      <div onClick={onDropdownClick} className={s.root}>
        <button className={`${s.btn} ${className}`}>{session.user?.fullname}</button>

        <ul className={`${s.list} ${isActive ? s.listActive : ""}`}>
          {links.map(({ segment, title }, i) => (
            <li key={i} className={s.item}>
              <Link href={segment} className={s.link}>
                {title}
              </Link>
            </li>
          ))}

          {isAdmin && (
            <li className={s.item}>
              <Link href="/dashboard" className={s.link}>
                Dashboard
              </Link>
            </li>
          )}

          <li className={s.item}>
            <Link onClick={onExitClick} href="/" className={s.link}>
              Exit
            </Link>
          </li>
        </ul>
      </div>
    ) : (
      <Link
        onClick={onCloseClick}
        className={`${s.btn} ${className}`}
        href="/account/profile"
        scroll={false}>
        {session.user.fullname}
      </Link>
    )
  ) : (
    <Link
      onClick={onSignClick}
      className={className}
      href={`/auth/signin?callbackUrl=${FRONTEND_URL}${pathname}${searchParams}`}
      scroll={false}>
      Sign-in/up
    </Link>
  );
};

// Workaround when no data resetted(reload) after logout (just router.push() or nothing at all)
// try {
//   await revalidatePathAction();
// } catch {
//   console.log(`Failed to revalidate ${window.location.pathname}`);
// }
// reinitApp();

{
  /* <li className={s.item}>
<Link href="/account/profile" className={s.link}>
  Profile
</Link>
</li>
<li className={s.item}>
<Link href="/account/add-post" className={s.link}>
  Add post
</Link>
</li>
<li className={s.item}>
<Link href="/account/my-posts" className={s.link}>
  My posts
</Link>
</li>
<li className={s.item}>
<Link href="/dashboard" className={s.link}>
  Dashboard
</Link>
</li> */
}
{
  /* <li className={s.item}>
<Link href="/dashboard" className={s.link}>
  Dashboard
</Link>
</li> */
}

// **
// return session ? (
//   isMQ896 ? (
//     <div onClick={onDropdownClick} className={s.root}>
//       <button className={`${s.btn} ${className}`}>{session.user?.fullname}</button>

//       <ul className={`${s.list} ${isActive ? s.listActive : ""}`}>
//         {links.map(({ segment, title }, i) => (
//           <li key={i} className={s.item}>
//             <Link href={segment} className={s.link}>
//               {title}
//             </Link>
//           </li>
//         ))}

//         <li className={s.item}>
//           <Link onClick={onExitClick} href="/" className={s.link}>
//             Exit
//           </Link>
//         </li>
//       </ul>
//     </div>
//   ) : (
//     <Link
//       onClick={onCloseClick}
//       className={`${s.btn} ${className}`}
//       href="/account/profile"
//       scroll={false}>
//       {session.user.fullname}
//     </Link>
//   )
// ) : (
//   <Link
//     onClick={onSignClick}
//     className={className}
//     href={`/auth/signin?callbackUrl=${FRONTEND_URL}${pathname}${searchParams}`}
//     scroll={false}>
//     Sign-in/up
//   </Link>
// );
