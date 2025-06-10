// function for query selectors
export function qs(selector) {
  return document.querySelector(selector);
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}