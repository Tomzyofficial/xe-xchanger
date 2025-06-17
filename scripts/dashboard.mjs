import { getLocalStorage, qs } from "./utils.mjs";

const userSession = getLocalStorage("User session");

// redirect unathorized users back to the signin page
if (!userSession) {
  location.assign("../signin.html");
}
// else user have authorization, give pass
const users = getLocalStorage("Users") || [];
const user = users.find(u => u.email === userSession);

if (!user) {
  location.assign("../signin.html");
}

// dynamically populate the dashboard page
const dashboard = qs("#dashboard");
dashboard.innerHTML = `
   <h1>Welcome to your Dashboard</h1>
      <p>Your email: ${user.email}</p>
      <p>Signup Date: ${user.date}</p>
      <p>Signed in session: ${userSession}</p>
      <button id="logout">Logout</button>
    `;
qs("#logout").addEventListener("click", function () {
  localStorage.removeItem("User session")
  location.assign("../signin.html")
});










