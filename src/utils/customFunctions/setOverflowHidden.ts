export const setOverflowHidden = (isOverflow: boolean) => {
  const html = document.documentElement;

  if (isOverflow) {
    const htmlWidth = html.offsetWidth;
    const scrollBarWidth = window.innerWidth - htmlWidth;

    html.style.setProperty("--scrollbar-offset", scrollBarWidth + "px");
    html.style.overflowY = "hidden";
    return;
  }

  html.style.setProperty("--scrollbar-offset", "0");
  html.style.overflowY = "";
};
