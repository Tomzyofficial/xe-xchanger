import { qs } from "./utils.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

// theme preference unordered list toggler
export const modeSwitch = qs("nav span");
modeSwitch.addEventListener("click", () => {
  qs("ul").classList.toggle("modeOpen");
})

// After contents load, load the localStorage to preserve theme preference 
document.addEventListener("DOMContentLoaded", () => {
  let savedTheme = getLocalStorage("theme");
  if (savedTheme) {
    document.body.classList.add(savedTheme);
  } else {
    savedTheme = [];
  }
})

// On each theme click, set the class (dark or light) and set the localStorage
qs("ul").addEventListener("click", (e) => {
  const selectedTheme = e.target.getAttribute("data-theme");
  if (selectedTheme) {
    document.body.classList.remove("dark", "light");

    document.body.classList.add(selectedTheme);

    setLocalStorage("theme", selectedTheme);
  }
})




