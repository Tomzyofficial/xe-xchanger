import {
  qs,
  getLocalStorage,
  setLocalStorage,
  alertMessage,
  removeAlert,
} from "./utils.mjs";

// get the sign in button
const btn = qs("button");
btn.addEventListener("click", (e) => {
  e.preventDefault();

  getUser();
});

const getUser = () => {
  let email = qs("#email").value;
  let password = qs("#password").value;
  let users = getLocalStorage("Users") || [];

  const userFound = users.find(
    (user) => user.email === email && user.password === password
  );

  if (email === "" || password === "") {
    removeAlert();
    alertMessage("Input fields must not be empty");
    return;
  }
  if (!userFound) {
    removeAlert();
    alertMessage("Invalid credentials. Incorrect email or password.");
    return;
  }
  // Store user session on the local storage
  setLocalStorage("User session", userFound.email);
  location.assign("../dashboard.html");

  // Redirect
  window.location.replace("/");
};
