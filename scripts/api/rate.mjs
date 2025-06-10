import { qs } from "../utils.mjs";
import { setLocalStorage, getLocalStorage } from "../utils.mjs";

export const rateApi = "https://api.fastforex.io/fetch-all?api_key=f30743c1c6-d1c52457c4-sxfxhm";

async function currencyConverter() {
  const amount = qs("input").value;
  const from = qs("#from-currency").value
  const to = qs("#to-currency").value
  let message = qs("#message")

  const rate = await fetch(rateApi)
  const data = await rate.json()

  try {

    if (rate.ok) {
      const result = data.results;
      if (!amount || isNaN(amount) || amount.trim === "") {
        message.textContent = "Please enter a valid number."
        return;
      }

      if (!result[from] || !result[to]) {
        message.textContent = "Choose currency to convert."
        return;
      }

      console.log(result)
      const conversionRate = (parseFloat(amount) / parseFloat(result[from])) * parseFloat(result[to]);
      const oneFromTo = (1 / result[from]) * result[to]
      const reverseRate = (1 / result[to]) * result[from]
      message.innerHTML = `Conversion of ${amount} ${from} to ${to} = 
        ${conversionRate.toLocaleString(undefined, {
        minimumFractionDigits: 2, maximumFractionDigits: 6
      })} 
        <br><br> 1 ${from} = ${oneFromTo.toLocaleString(undefined, {
        minimumFractionDigits: 2, maximumFractionDigits: 6
      })} ${to} 
        <br> 1 ${to} = ${reverseRate.toLocaleString(undefined, {
        minimumFractionDigits: 2, maximumFractionDigits: 6
      })} ${from}
      `;

      let convertedResults = getLocalStorage("Results") || [];

      convertedResults.push(message.textContent);
      setLocalStorage("Results", convertedResults)

    } else {
      throw { Error: "Internal error", Message: data };
    }

  } catch (error) {
    console.error(error);
  }
}

// input validator

export const rateValidator = qs('#convert-btn')
  .addEventListener('click', () => {
    currencyConverter()
  });




