import { qs } from "./utils.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { alertMessage, removeAlert } from "./utils.mjs";

// formdata—which makes it easy to construct key/value key which represents the form fields
const formToJson = (formElement) => {
  const formData = new FormData(formElement)
  const convertedJson = {}
  formData.forEach((value, key) => {
    convertedJson[key] = value
  });
  return convertedJson
}

// payload
const onSubmit = (payload) => {
  const options = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" }
  }
  return options
}

const formElems = () => {
  let email = qs("#email")
  let password = qs("#password")

  if (email.value == "" || password.value == "") {
    removeAlert()
    alertMessage("Input fields must not be empty")
    return;
  }

  const formElement = document.forms["signup"]
  const form = formToJson(formElement)

  const userLocale = navigator.language || navigator.userLanguage;
  const now = new Date();
  const formatted = now.toLocaleString(userLocale);

  form.date = formatted
  form.email = form.email
  form.password = form.password

  try {
    if (form) {
      onSubmit(form)
      removeAlert()
      alertMessage("Account created. Proceed to sign in.")
      email.value = ""
      password.value = "";
      let users = getLocalStorage("Users") || []
      users.push(form);
      setLocalStorage("Users", users)
    } else {
      alertMessage("Account can't be created at this time. Error occurred.")
      throw { Error: "Internal error", Message: form }
    }
  } catch (error) {
    console.error(error)
    alertMessage(error);
  }
}

// get the sign up button
qs("button").addEventListener("click", (e) => {
  e.preventDefault();
  formElems()
})