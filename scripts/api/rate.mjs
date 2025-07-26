import { qs } from "../utils.mjs";
import { setLocalStorage, getLocalStorage } from "../utils.mjs";

// currency rate api
export const rateApi = "https://v6.exchangerate-api.com/v6/eca3ba2941590b081aed70d9/latest/USD";

async function currencyConverter() {
  const amount = qs("input").value;
  const from = qs("#from-currency").value;
  const to = qs("#to-currency").value;
  let message = qs("#message");

  const rate = await fetch(rateApi);
  const data = await rate.json();

  try {

    if (!amount || isNaN(amount) || amount.trim === "") {
      message.textContent = "Please enter a valid number.";
      return;
    }
    // if user doesn't select currency to convert from and currency to convert to
    if (rate.ok) {
      const result = data.conversion_rates;
      if (!result[from] || !result[to]) {
        message.textContent = "Choose currency to convert.";
        return;
      }

      // perform mathematical currency conversion
      const conversionRate = (parseFloat(amount) / parseFloat(result[from])) * parseFloat(result[to]);
      const oneFromTo = (1 / result[from]) * result[to]
      const reverseRate = (1 / result[to]) * result[from]

      message.innerHTML = `Conversion of ${amount} ${from} to ${to} = ${conversionRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} ${to} <br><br> 1 ${from} = ${oneFromTo.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} ${to} <br> 1 ${to} = ${reverseRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} ${from}`;

      const convertedResults = getLocalStorage("Results") || [];

      convertedResults.push(message.textContent);
      setLocalStorage("Results", convertedResults)

    } else {
      throw { Error: "Internal error", Message: data };
    }

  } catch (error) {
    console.error(error);
  }
}

async function reverseCurrencyConverter() {
  const amount = qs("input").value;
  const from = qs("#from-currency").value
  const to = qs("#to-currency").value
  let message = qs("#message")

  const rate = await fetch(rateApi)
  const data = await rate.json()

  try {

    if (!amount || isNaN(amount) || amount.trim === "") {
      message.textContent = "Please enter a valid number."
      return;
    }

    if (rate.ok) {
      const result = data.conversion_rates;

      if (!result[from] || !result[to]) {
        message.textContent = "Choose currency to convert."
        return;
      }

      const conversionRate = (parseFloat(amount) / parseFloat(result[to])) * parseFloat(result[from]);
      const oneFromTo = (1 / result[to]) * result[from]
      const reverseRate = (1 / result[from]) * result[to]

      message.innerHTML = `Conversion of ${amount} ${to} to ${from} = ${conversionRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} ${from} <br><br> 1 ${to} = ${oneFromTo.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} ${from} <br> 1 ${from} = ${reverseRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} ${to}`;
    } else {
      throw { Error: "Internal error", Message: data };
    }

  } catch (error) {
    console.error(error);
  }
}

export const reverseConverter = qs(".arrow-icons")
  .addEventListener("click", reverseCurrencyConverter)

export const rateValidator = qs('#convert-btn')
  .addEventListener('click', currencyConverter);














