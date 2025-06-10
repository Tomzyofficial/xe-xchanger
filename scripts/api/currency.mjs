import { qs } from "../utils.mjs";

const currencyApi = "https://api.exchangerate.host/list?access_key=e5597ab58be01ddc7c51a883c753a204";

export const jsonResponse = async (res) => {
  const convertFrom = qs("#from-currency");
  const convertTo = qs("#to-currency");
  const data = await res.json();
  const currencies = data.currencies;
  if (res.ok) {
    for (const code in currencies) {
      if (currencies.hasOwnProperty(code)) {
        const option1 = document.createElement("option");
        option1.value = code;
        option1.textContent = `${code} - ${currencies[code]}`
        const option2 = option1.cloneNode(true);
        convertFrom.append(option1);
        convertTo.append(option2)
      }
    }
  } else {
    throw { Error: "Server error", Message: data };
  }
}

// fetch country currency name with code from the api currencyApi
export const fetchData = async () => {
  const res = await fetch(currencyApi);
  const data = await jsonResponse(res);
  return data;
}

