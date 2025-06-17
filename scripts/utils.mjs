// function for query selectors
export function qs(selector) {
  return document.querySelector(selector);
}

// function to set local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

// function to get local storage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}

// function to alert message
export function alertMessage(message, scroll = true) {
  const div = document.createElement("div");
  div.classList.add("alert");
  div.innerHTML = `<p>${message}</p> <span>X</span>`;
  div.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this)
    } else {
      console.log("Tag not defined")
    }
  })

  const main = qs("main");
  main.prepend(div);

  if (scroll) window.scrollTo(0, 0)
}

// function to remove alert message
export function removeAlert() {
  const alerts = document.querySelectorAll(".alert")
  alerts.forEach(alert => {
    qs("main").removeChild(alert)
  });
}

