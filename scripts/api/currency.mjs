import { qs } from "../utils.mjs";

// currency code and name api
const currencyApi = "https://v6.exchangerate-api.com/v6/eca3ba2941590b081aed70d9/codes";

export const jsonResponse = async (res) => {
  const convertFrom = qs("#from-currency");
  const convertTo = qs("#to-currency");
  const data = await res.json();
  const currencies = data.supported_codes;
  if (res.ok) {
    currencies.map(value => {
      const option1 = document.createElement("option");
      option1.value = value[0];
      option1.textContent = `${value[0]} - ${value[1]}`;
      const option2 = option1.cloneNode(true);
      convertFrom.append(option1);
      convertTo.append(option2)
    })

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

