import { qs } from "../utils.mjs";

// currency code and name api
const url = "https://v6.exchangerate-api.com/v6/eca3ba2941590b081aed70d9/codes";

const jsonRes = async (url) => {
  try {
    const res = await fetch(url);
    if (!res) throw new Error("Coudn't fetch currency API");
    return res;
  } catch (err) {
    throw new Error("Fetched failed");
  }
};

export const currencyApi = async (res) => {
  const convertFrom = qs("#from-currency");
  const convertTo = qs("#to-currency");
  const data = await res.json();
  const currencies = data.supported_codes;
  if (res.ok && Array.isArray(currencies)) {
    currencies.map((value) => {
      const option1 = document.createElement("option");
      option1.value = value[0];
      option1.textContent = `${value[0]} - ${value[1]}`;
      const option2 = option1.cloneNode(true);
      convertFrom.append(option1);
      convertTo.append(option2);
    });
  } else {
    throw { error: "Server error", message: data };
  }
};

// fetch country currency name with code from the api currencyApi
export const fetchData = async () => {
  try {
    const res = await jsonRes(url);
    await currencyApi(res);
  } catch (err) {
    console.error(err);
  }
};
fetchData();
