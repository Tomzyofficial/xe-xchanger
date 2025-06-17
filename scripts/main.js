import { fetchData } from "./api/currency.mjs";
import { rateValidator } from "./api/rate.mjs";
import { reverseConverter } from "./api/rate.mjs";
import { modeSwitch } from "./modeChanger.mjs";

import { qs } from "./utils.mjs";

// menu options toggler
qs(".nav-menu .menu-icon")
  .addEventListener("click", function () {
    qs(".nav-top").classList.toggle("menu-show")
  })

fetchData();
rateValidator;
reverseConverter
modeSwitch;
