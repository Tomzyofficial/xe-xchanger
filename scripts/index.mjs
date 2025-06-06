import { jsonResponse } from "./api/api.mjs";
import { qs } from "./utils.mjs";
const url = "https://api.exchangerate.host/list?access_key=e5597ab58be01ddc7c51a883c753a204";

// input validator
function inputValidator() {
  let errorMessage = qs('#error-message');
  const btn = qs('#convert-btn');
  btn.addEventListener('click', () => {
    const input = qs('input');
    if (isNaN(input.value) || input.value.trim() === '') {
      errorMessage.textContent = 'Please enter a valid number';
      input.value = '';
      input.focus();
    } else {
      errorMessage.textContent = `You entered: ${input.value}`;
    }
  });
}
inputValidator();

// site year
(function siteYear() {
  const year = new Date().getFullYear();
  const yearElement = qs('#current-year');
  yearElement.textContent = year;
})();

// fetch country currency name with code from the api url
const fetchData = async () => {
  const res = await fetch(url);
  const data = await jsonResponse(res);
  return data;
}
fetchData()