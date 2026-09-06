import { renderDataInitially } from "./utils/renderDataInitially.js";
import { displayHeadlineAndCalendar } from "./utils/calendar.js";
import { fetchAndDisplayQuote } from "./utils/quote.js";
import { changeElementDisplay } from "./utils/utils.js";
import { setUpEventListeners } from "./utils/setUpEventlisteners.js";
import { displayLifetime, drawConnectingLine, clearConnectingLine } from "./utils/lifetime.js";

const quoteDabba = document.getElementById("quoteDabba");
const tasksDabba = document.getElementById("tasksDabba");
const lifetimeDabba = document.getElementById("lifetimeDabba");

// =====================

document.addEventListener("DOMContentLoaded", () => {
  renderDataInitially();
  displayHeadlineAndCalendar();
  fetchAndDisplayQuote();
  setUpEventListeners();
});

window.addEventListener("resize", () => {
  drawConnectingLine();
});

// listening for user actions
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // quote related
  if (message.command === "show quote") {
    changeElementDisplay(quoteDabba, "flex");
  } else if (message.command === "hide quote") {
    changeElementDisplay(quoteDabba, "none");
  }

  // tasks related
  else if (message.command === "show tasks") {
    changeElementDisplay(tasksDabba, "block");
  } else if (message.command === "hide tasks") {
    changeElementDisplay(tasksDabba, "none");
  }

  // title related
  else if (message.command === "change title") {
    chrome.storage.local.get(["docTitle"]).then((data) => {
      document.title = data.docTitle;
    });
  }

  // lifetime related
  else if (message.command === "show lifetime") {
    displayLifetime();
  } else if (message.command === "hide lifetime") {
    changeElementDisplay(lifetimeDabba, "none");
    clearConnectingLine();
  } else if (message.command === "change lifetime") {
    displayLifetime();
  }
});

// =====================

chrome.storage.onChanged.addListener((changes, namespace) => {
  // single tasks
  if (namespace === "local" && changes.tasks) {
    const { task1: newTask1, task2: newTask2, task3: newTask3 } = changes.tasks.newValue;
    task1.textContent = newTask1;
    task2.textContent = newTask2;
    task3.textContent = newTask3;
  }
  // tasks dabba
  else if (namespace === "local" && changes.showTasks) {
    const newShowTasks = changes.showTasks.newValue;
    changeElementDisplay(tasksDabba, newShowTasks ? "block" : "none");
  }
  // lifetime dabba
  else if (namespace === "local" && changes.showLifetime) {
    const newShowLifetime = changes.showLifetime.newValue;
    if (newShowLifetime) {
      displayLifetime();
    } else {
      changeElementDisplay(lifetimeDabba, "none");
      clearConnectingLine();
    }
  }
  // birth year
  else if (namespace === "local" && changes.birthYear) {
    displayLifetime();
  }
});
