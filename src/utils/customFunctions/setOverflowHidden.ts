export const setOverflowHidden = (isOverflow: boolean) => {
  const html = document.documentElement;
  let count = parseInt(html.getAttribute("oh-count") ?? "0");

  if (isOverflow) {
    const htmlWidth = html.offsetWidth;
    const scrollBarWidth = window.innerWidth - htmlWidth;

    html.style.setProperty("--scrollbar-offset", scrollBarWidth + "px");
    html.style.overflowY = "hidden";

    html.setAttribute("oh-count", `${++count}`);
    return;
  }

  if (count <= 1) {
    html.style.setProperty("--scrollbar-offset", "0");
    html.style.overflowY = "";
  }

  if (count > 0) {
    html.setAttribute("oh-count", `${--count}`);
  }
};
