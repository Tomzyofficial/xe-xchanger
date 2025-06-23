import { qs } from "../utils.mjs";
import { setLocalStorage, getLocalStorage } from "../utils.mjs";

var fetchedRates = {};

// Fetch local rates.json and then fetch live exchange rates
fetch("./scripts/rates.json")
  .then(res => {
    if (!res.ok) throw new Error("rates.json not found");
    return res.json();
  })
  .then(data => {
    const localResults = data[0].results;
    const currencies = Object.values(localResults).join(",");

    const rateApi = `https://api.exchangeratesapi.io/v1/latest?access_key=b847c861fb324269878afa9e86e0afe6&symbols=${currencies}&format=1`;

    return fetch(rateApi);
  })
  .then(res => {
    if (!res.ok) throw { error: "Internal error", message: res };
    return res.json();
  })
  .then(data => {
    fetchedRates = data.rates; // Store rates globally for converter use
  })
  .catch(error => console.error("Error loading currency data:", error));


async function currencyConverter() {
  const amount = qs("input").value;
  const from = qs("#from-currency").value;
  const to = qs("#to-currency").value;
  const message = qs("#message");

  try {
    if (!amount || isNaN(amount) || amount.trim() === "") {
      message.textContent = "Please enter a valid number.";
      return;
    }

    if (!fetchedRates[from] || !fetchedRates[to]) {
      message.textContent = "Choose valid currencies to convert.";
      return;
    }

    const conversionRate = (parseFloat(amount) / parseFloat(fetchedRates[from])) * parseFloat(fetchedRates[to]);
    const oneFromTo = (1 / fetchedRates[from]) * fetchedRates[to];
    const reverseRate = (1 / fetchedRates[to]) * fetchedRates[from];

    message.innerHTML = `Conversion of ${amount} ${from} to ${to} = ${conversionRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} ${to} <br><br> 1 ${from} = ${oneFromTo.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} ${to} <br> 1 ${to} = ${reverseRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} ${from}`;

    let convertedResults = getLocalStorage("Results") || [];
    convertedResults.push(message.textContent);
    setLocalStorage("Results", convertedResults);

  } catch (error) {
    console.error("Conversion error:", error);
    message.textContent = "An error occurred during conversion.";
  }
}

async function reverseCurrencyConverter() {
  const amount = qs("input").value;
  const from = qs("#from-currency").value;
  const to = qs("#to-currency").value;
  let message = qs("#message");


  try {
    if (!amount || isNaN(amount) || amount.trim() === "") {
      message.textContent = "Please enter a valid number.";
      return;
    }

    if (!fetchedRates[from] || !fetchedRates[to]) {
      message.textContent = "Choose valid currencies to convert.";
      return;
    }

    const conversionRate = (parseFloat(amount) / parseFloat(fetchedRates[to])) * parseFloat(fetchedRates[from]);
    const oneFromTo = (1 / fetchedRates[to]) * fetchedRates[from]
    const reverseRate = (1 / fetchedRates[from]) * fetchedRates[to]

    message.innerHTML = `Conversion of ${amount} ${to} to ${from} = ${conversionRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} ${from} <br><br> 1 ${to} = ${oneFromTo.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} ${from} <br> 1 ${from} = ${reverseRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} ${to}`;

  } catch (error) {
    console.error("Conversion error:", error);
    message.textContent = "An error occurred during conversion.";
  }
}

// Add event listener for swap conversion
export const reverseConverter = qs(".arrow-icons")
  .addEventListener("click", reverseCurrencyConverter)

// Add event listener for conversion
export const rateValidator = qs('#convert-btn')
  .addEventListener('click', currencyConverter);