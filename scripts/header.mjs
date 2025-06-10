import { qs } from "./utils.mjs";

function renderTemplate(template, parentElem, callback, data) {
  parentElem.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data)
  }
}

async function loadHtmlPath(path) {
  const filePath = await fetch(path);
  const file = await filePath.text();
  return file;
}

async function header() {
  const header = qs("header");

  const headerPath = await loadHtmlPath("../partials/header.html");

  renderTemplate(headerPath, header);
}
header();